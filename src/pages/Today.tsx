import { Link } from "react-router-dom";
import { Flame, Play, Clock, ChevronRight } from "lucide-react";
import { computeStreak, computeTodayIndex, useProgress } from "../store/progress";
import { getSessionForDay } from "../data/program";
import { VideoPlayer } from "../components/VideoPlayer";

export function Today() {
  const state = useProgress();
  const dayIndex = computeTodayIndex(state);
  const streak = computeStreak(state);
  const plan = getSessionForDay(dayIndex, {
    csection: state.csection && !state.cleared,
    activeDiastasis: state.activeDiastasis,
    hopTestPassed: state.hopTestPassed,
  });
  const completedToday = !!state.completed[dayIndex];
  const preview = plan.exercises[0];

  return (
    <div className="space-y-6">
      <section className="card overflow-hidden">
        <div className="grid gap-0 md:grid-cols-5">
          <div className="md:col-span-3 p-6">
            <div className="pill mb-3">{plan.subtitle}</div>
            <h1 className="font-display text-3xl leading-tight text-sage-900">
              {plan.isRestDay ? "Restorative day" : "Today's session"}
            </h1>
            <p className="mt-2 text-ink-600">
              {plan.isRestDay
                ? "Breath, a gentle stretch, and a short walk. Nothing strenuous today."
                : "A 15-minute flow tuned to where you are. You can skip or hold any exercise at any time."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-600">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {plan.totalMinutes} min
              </span>
              <span className="inline-flex items-center gap-1">
                <Flame className="h-4 w-4 text-cream-600" /> {streak}-day streak
              </span>
              <span>Day {dayIndex + 1}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/session" className="btn-primary">
                <Play className="mr-2 h-4 w-4" />
                {completedToday ? "Repeat today" : "Start session"}
              </Link>
              <Link to="/library" className="btn-secondary">
                Browse library
              </Link>
            </div>
            {completedToday && (
              <p className="mt-4 text-sm text-sage-700">
                Done for today. Lovely work.
              </p>
            )}
          </div>
          <div className="md:col-span-2 relative min-h-56 bg-sage-900">
            {preview && (
              <VideoPlayer exercise={preview} showCues={false} rounded={false} />
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl text-sage-900">
          What's in today's session
        </h2>
        <ol className="space-y-2">
          {plan.exercises.map((e, i) => (
            <li
              key={e.id + i}
              className="card flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-sage-100 grid place-items-center font-display text-sage-800">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium text-ink-800">
                    {e.name}
                  </div>
                  <div className="truncate text-xs text-ink-500">
                    {Math.round(e.durationSec / (e.unilateral ? 1 : 1))}s
                    {e.unilateral ? " per side" : ""} · {e.category}
                  </div>
                </div>
              </div>
              <Link
                to={`/library/${e.id}`}
                className="inline-flex items-center text-sm text-sage-700 hover:underline"
              >
                How to <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-5">
        <h3 className="font-display text-lg text-sage-900">Self-checks</h3>
        <p className="mt-1 text-sm text-ink-600">
          Quick, optional tools to make sure your program fits where your body
          is right now.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            to="/diastasis-check"
            className="block rounded-2xl border border-ink-100 p-4 transition hover:bg-sage-50"
          >
            <div className="font-medium text-ink-800">
              Diastasis Recti self-check
            </div>
            <p className="mt-1 text-sm text-ink-500">
              A 30-second test to measure the gap. Adjusts your program.
            </p>
          </Link>
          <Link
            to="/hop-test"
            className="block rounded-2xl border border-ink-100 p-4 transition hover:bg-sage-50"
          >
            <div className="font-medium text-ink-800">
              Pelvic-floor hop test
            </div>
            <p className="mt-1 text-sm text-ink-500">
              Needed to unlock running/jumping in Phase 3.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
