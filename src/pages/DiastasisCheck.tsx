import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../store/progress";

const STEPS = [
  "Lie on your back with your knees bent and feet flat.",
  "Place two fingers horizontally, just above your belly button.",
  "Lift your head and shoulders off the floor a small amount — like a mini crunch.",
  "Feel for a gap between the muscle bands and note how many finger-widths it is.",
];

export function DiastasisCheck() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<null | "narrow" | "moderate" | "wide">(
    null,
  );

  const save = (r: "narrow" | "moderate" | "wide") => {
    setResult(r);
    useProgress.getState().setActiveDiastasis(r !== "narrow");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-sage-900">
          Diastasis Recti self-check
        </h1>
        <p className="mt-1 text-ink-600">
          A quick test to check for abdominal separation. If in doubt, see a
          pelvic-floor PT.
        </p>
      </header>

      <div className="card p-5 space-y-4">
        <ol className="space-y-2 text-ink-700">
          {STEPS.map((s, i) => (
            <li
              key={i}
              className={`rounded-2xl p-3 ${
                i === step
                  ? "bg-sage-50 text-sage-900 ring-1 ring-sage-200"
                  : "text-ink-500"
              }`}
            >
              <span className="font-medium text-sage-800">{i + 1}.</span> {s}
            </li>
          ))}
        </ol>

        {step < STEPS.length - 1 && (
          <button className="btn-primary" onClick={() => setStep((s) => s + 1)}>
            Next step
          </button>
        )}

        {step === STEPS.length - 1 && !result && (
          <div className="space-y-3">
            <p className="text-sm text-ink-600">How wide was the gap?</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary" onClick={() => save("narrow")}>
                1–2 fingers
              </button>
              <button className="btn-secondary" onClick={() => save("moderate")}>
                2–3 fingers
              </button>
              <button className="btn-secondary" onClick={() => save("wide")}>
                3+ fingers
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="rounded-2xl bg-sage-50 p-4 text-sm text-ink-700 ring-1 ring-sage-200">
            {result === "narrow" && (
              <p>
                Within typical range. Your regular program is fine — keep an
                eye on belly "doming" during any core work.
              </p>
            )}
            {result !== "narrow" && (
              <p>
                We'll skip exercises that can worsen diastasis (full planks,
                sit-ups, shoulder-tap plank) and emphasise dead bugs, heel
                slides, and bird-dogs. Consider seeing a pelvic-floor PT.
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
