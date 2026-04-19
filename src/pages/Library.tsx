import { Link } from "react-router-dom";
import { Lock, Footprints } from "lucide-react";
import { EXERCISES, type Phase } from "../data/exercises";
import { phaseLabel } from "../data/program";
import { useProgress } from "../store/progress";

const PHASES: Phase[] = [1, 2, 3];

export function Library() {
  const hopTestPassed = useProgress((s) => s.hopTestPassed);
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-sage-900">Exercise library</h1>
        <p className="mt-1 text-ink-600">
          Every movement in the program, with how-to and form cues.
        </p>
      </header>
      {PHASES.map((p) => (
        <section key={p}>
          <h2 className="mb-3 font-display text-xl text-sage-800">
            {phaseLabel(p)}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {EXERCISES.filter((e) => e.phase === p).map((e) => {
              const locked = !!e.requiresHopTest && !hopTestPassed;
              return (
                <Link
                  key={e.id}
                  to={`/library/${e.id}`}
                  className="card p-4 transition hover:-translate-y-0.5 hover:bg-sage-50/70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-ink-800">{e.name}</div>
                    {locked && (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-800"
                        title="Requires passing the pelvic-floor hop test"
                      >
                        <Lock className="h-3 w-3" /> Hop test
                      </span>
                    )}
                    {e.avoidIfDiastasis && (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sage-800"
                        title="Skip with active diastasis"
                      >
                        <Footprints className="h-3 w-3" /> DR-aware
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-ink-500">{e.summary}</div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-sage-700">
                    {e.category}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
