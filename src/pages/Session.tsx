import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pause, Play, SkipForward, X, Check } from "lucide-react";
import { computeTodayIndex, useProgress } from "../store/progress";
import { getSessionForDay } from "../data/program";
import { VideoPlayer } from "../components/VideoPlayer";
import type { Exercise } from "../data/exercises";

interface Step {
  exercise: Exercise;
  side: "both" | "left" | "right";
  durationSec: number;
}

function expand(exercises: Exercise[]): Step[] {
  const steps: Step[] = [];
  for (const e of exercises) {
    if (e.unilateral) {
      steps.push({ exercise: e, side: "right", durationSec: e.durationSec });
      steps.push({ exercise: e, side: "left", durationSec: e.durationSec });
    } else {
      steps.push({ exercise: e, side: "both", durationSec: e.durationSec });
    }
  }
  return steps;
}

export function Session() {
  const nav = useNavigate();
  const params = useParams();
  const state = useProgress();
  const dayIndex = useMemo(() => {
    if (params.dayIndex) return Number(params.dayIndex);
    return computeTodayIndex(state);
  }, [params.dayIndex, state]);

  const plan = useMemo(
    () =>
      getSessionForDay(dayIndex, {
        csection: state.csection && !state.cleared,
        activeDiastasis: state.activeDiastasis,
        hopTestPassed: state.hopTestPassed,
      }),
    [dayIndex, state.csection, state.cleared, state.activeDiastasis, state.hopTestPassed],
  );
  const steps = useMemo(() => expand(plan.exercises), [plan.exercises]);

  const [stepIdx, setStepIdx] = useState(0);
  const [remaining, setRemaining] = useState(steps[0]?.durationSec ?? 0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const completedIds = useRef<Set<string>>(new Set());

  const current = steps[stepIdx];

  // Countdown
  useEffect(() => {
    if (paused || done || !current) return;
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [paused, done, current, stepIdx]);

  // Advance on zero
  useEffect(() => {
    if (!current) return;
    if (remaining > 0) return;
    completedIds.current.add(current.exercise.id);
    const next = stepIdx + 1;
    if (next >= steps.length) {
      setDone(true);
      return;
    }
    setStepIdx(next);
    setRemaining(steps[next].durationSec);
  }, [remaining, current, stepIdx, steps]);

  // On finish, persist.
  useEffect(() => {
    if (!done) return;
    const iso = new Date().toISOString().slice(0, 10);
    useProgress.getState().completeSession({
      dayIndex,
      isoDate: iso,
      completedExerciseIds: Array.from(completedIds.current),
    });
  }, [done, dayIndex]);

  if (!current && !done) {
    return (
      <div className="py-16 text-center text-ink-500">
        No exercises scheduled today.
      </div>
    );
  }

  if (done) {
    return <SessionComplete dayIndex={dayIndex} />;
  }

  const nextLabel =
    stepIdx + 1 < steps.length
      ? `Next: ${steps[stepIdx + 1].exercise.name}${steps[stepIdx + 1].side !== "both" ? ` (${steps[stepIdx + 1].side})` : ""}`
      : "Last one — almost done!";
  const progressPct = Math.min(
    100,
    Math.max(0, ((stepIdx + (1 - remaining / Math.max(1, current.durationSec))) / steps.length) * 100),
  );

  const tryEnd = () => {
    const started = stepIdx > 0 || remaining < steps[0].durationSec;
    if (started && !confirm("End session? Your progress for today won't be saved.")) return;
    nav("/");
  };

  const sideLabel =
    current.side === "both" ? "" : current.side === "right" ? "Right side" : "Left side";

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-cream-50">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={tryEnd}
          className="btn-ghost"
          aria-label="End session"
        >
          <X className="mr-1 h-4 w-4" /> End
        </button>
        <div className="text-sm text-ink-500">
          {stepIdx + 1} / {steps.length}
        </div>
      </div>
      <div
        className="mx-5 h-1 overflow-hidden rounded-full bg-sage-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPct)}
      >
        <div
          className="h-full bg-sage-600 transition-[width] duration-500 ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-3xl flex-1 px-5 pb-4">
        <div className="relative h-[55dvh] w-full overflow-hidden rounded-3xl">
          <VideoPlayer exercise={current.exercise} autoPlay showCues />
        </div>

        <div className="mt-5 grid grid-cols-3 items-center gap-3">
          <div>
            {sideLabel && (
              <div className="pill">{sideLabel}</div>
            )}
          </div>
          <div className="text-center">
            <div className="font-display text-6xl tabular-nums text-sage-900">
              {formatTime(remaining)}
            </div>
          </div>
          <div className="text-right text-xs text-ink-500">{nextLabel}</div>
        </div>

        <h2 className="mt-3 text-center font-display text-2xl text-sage-900">
          {current.exercise.name}
        </h2>
        <p className="text-center text-sm text-ink-500">
          {current.exercise.summary}
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            className="btn-secondary"
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              <>
                <Play className="mr-2 h-4 w-4" /> Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            )}
          </button>
          <button className="btn-primary" onClick={() => setRemaining(0)}>
            <SkipForward className="mr-2 h-4 w-4" /> Next
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-ink-400">
          Stop if you feel pain, leakage, or pelvic heaviness.{" "}
          <Link to={`/library/${current.exercise.id}`} className="underline">
            Form details
          </Link>
        </p>
      </div>
    </div>
  );
}

function formatTime(sec: number): string {
  const s = Math.max(0, sec);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
}

function SessionComplete({ dayIndex }: { dayIndex: number }) {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
        <Check className="h-8 w-8 text-sage-700" />
      </div>
      <h1 className="font-display text-3xl text-sage-900">Session complete</h1>
      <p className="mt-2 text-ink-600">
        Day {dayIndex + 1} logged. Hydrate, breathe, and be proud of yourself.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to Today
        </Link>
        <Link to="/progress" className="btn-secondary">
          See progress
        </Link>
      </div>
    </div>
  );
}
