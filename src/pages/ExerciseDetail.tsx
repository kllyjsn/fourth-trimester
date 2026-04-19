import { Link, useParams } from "react-router-dom";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { getExerciseById } from "../data/exercises";
import { VideoPlayer } from "../components/VideoPlayer";

export function ExerciseDetail() {
  const { exerciseId } = useParams();
  const exercise = exerciseId ? getExerciseById(exerciseId) : undefined;

  if (!exercise) {
    return (
      <div className="py-10 text-center text-ink-500">
        Exercise not found.{" "}
        <Link to="/library" className="underline">
          Back to library
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/library"
          className="inline-flex items-center text-sm text-sage-700 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> Library
        </Link>
      </div>
      <header>
        <div className="pill">Phase {exercise.phase} · {exercise.category}</div>
        <h1 className="mt-2 font-display text-3xl text-sage-900">
          {exercise.name}
        </h1>
        <p className="mt-1 text-ink-600">{exercise.summary}</p>
      </header>
      <div className="h-64 overflow-hidden rounded-3xl sm:h-80">
        <VideoPlayer exercise={exercise} showCues rounded={false} />
      </div>

      <section className="card p-5">
        <h2 className="font-display text-lg text-sage-900">How to</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-700">
          {exercise.howTo.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      </section>

      <section className="card p-5">
        <h2 className="font-display text-lg text-sage-900">Form cues</h2>
        <ul className="mt-3 space-y-2 text-ink-700">
          {exercise.cues.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage-600" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-cream-300 bg-cream-100/60 p-5">
        <div className="flex items-center gap-2 text-cream-900">
          <AlertTriangle className="h-4 w-4" />
          <h2 className="font-display text-lg">Stop and check in if…</h2>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
          {exercise.redFlags.map((r, i) => (
            <li key={i}>— {r}</li>
          ))}
        </ul>
        {exercise.avoidIfDiastasis && (
          <p className="mt-3 text-sm text-ink-600">
            Avoid this if you have an active diastasis recti gap wider than two
            fingers — stick to{" "}
            <Link to="/library/dead-bug" className="underline">
              dead bugs
            </Link>{" "}
            and heel slides instead.
          </p>
        )}
        {!exercise.csectionSafe && (
          <p className="mt-3 text-sm text-ink-600">
            Wait until you're fully cleared after a C-section before adding
            this one.
          </p>
        )}
      </section>
    </div>
  );
}
