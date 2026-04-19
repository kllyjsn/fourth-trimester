import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../store/progress";

export function HopTest() {
  const nav = useNavigate();
  const [result, setResult] = useState<null | "pass" | "fail">(null);

  const pass = () => {
    setResult("pass");
    useProgress.getState().setHopTestPassed(true);
  };
  const fail = () => {
    setResult("fail");
    useProgress.getState().setHopTestPassed(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-sage-900">
          Pelvic-floor hop test
        </h1>
        <p className="mt-1 text-ink-600">
          A simple screen before you start running or jumping again.
        </p>
      </header>

      <div className="card p-5 space-y-4">
        <ol className="list-decimal space-y-2 pl-5 text-ink-700">
          <li>Empty your bladder.</li>
          <li>Stand barefoot, feet hip-width apart.</li>
          <li>
            Hop in place on one foot for 10 repetitions. Repeat on the other
            foot.
          </li>
          <li>
            Check for any leakage, pelvic heaviness, pain, or a feeling of
            instability.
          </li>
        </ol>
        <p className="rounded-2xl bg-cream-100 p-3 text-sm text-ink-700">
          Any leakage or heaviness is a <strong>no</strong> — it isn't a
          failure, it's information. Stay on low-impact work and revisit this
          in 2 weeks.
        </p>

        {!result && (
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary" onClick={pass}>
              No symptoms — pass
            </button>
            <button className="btn-secondary" onClick={fail}>
              I felt symptoms
            </button>
          </div>
        )}
        {result && (
          <div className="rounded-2xl bg-sage-50 p-4 text-sm text-ink-700 ring-1 ring-sage-200">
            {result === "pass" ? (
              <p>
                Great — running and lateral-bound content is unlocked for you
                in Phase 3. Keep an eye on how you feel each session.
              </p>
            ) : (
              <p>
                We'll keep running and jumping tucked away for now and focus on
                glute medius, deep core, and pelvic-floor work. You can redo
                this any time.
              </p>
            )}
            <button
              className="btn-primary mt-4"
              onClick={() => nav("/", { replace: true })}
            >
              Back to today
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
