import { Link } from "react-router-dom";
import { EXERCISES, type Phase } from "../data/exercises";
import { phaseLabel } from "../data/program";

const PHASES: Phase[] = [1, 2, 3];

export function Library() {
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
            {EXERCISES.filter((e) => e.phase === p).map((e) => (
              <Link
                key={e.id}
                to={`/library/${e.id}`}
                className="card p-4 transition hover:-translate-y-0.5 hover:bg-sage-50/70"
              >
                <div className="font-medium text-ink-800">{e.name}</div>
                <div className="mt-1 text-sm text-ink-500">{e.summary}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-sage-700">
                  {e.category}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
