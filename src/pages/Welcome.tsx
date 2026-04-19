import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../store/progress";
import { ShieldCheck } from "lucide-react";

export function Welcome() {
  const nav = useNavigate();
  const set = useProgress.getState();
  const [name, setName] = useState("");
  const [weeks, setWeeks] = useState(2);
  const [csection, setCsection] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const canContinue = accepted;

  const start = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    set.setStartDate(`${yyyy}-${mm}-${dd}`);
    set.setName(name.trim());
    set.setStartWeeksPostpartum(weeks);
    set.setCsection(csection);
    set.setCleared(cleared);
    set.setOnboarded(true);
    nav("/", { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-sage-200 grid place-items-center">
          <span className="font-display text-sage-800">4T</span>
        </div>
        <div>
          <div className="font-display text-2xl text-sage-900">
            Fourth Trimester
          </div>
          <div className="text-sm text-ink-500">
            A calm, daily 15-minute postpartum companion.
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sage-800">
            <ShieldCheck className="h-5 w-5" />
            <div className="font-medium">Before we begin</div>
          </div>
          <p className="text-sm leading-relaxed text-ink-600">
            This app is informational, not medical advice. Please get clearance
            from your OB, midwife, or pelvic-floor physiotherapist before
            starting — especially after a C-section or a complicated recovery.
            If anything hurts, causes leakage, or increases bleeding, stop and
            contact your provider.
          </p>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-ink-700">
            Your name <span className="text-ink-400">(optional)</span>
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            className="mt-1 block w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-base shadow-sm focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink-700">
            How many weeks postpartum are you?
          </span>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={26}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="flex-1 accent-sage-700"
            />
            <span className="w-16 text-right font-display text-lg text-sage-900">
              {weeks} wk
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-400">
            We'll use this to pick the right phase for you.
          </p>
        </label>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={csection}
              onChange={(e) => setCsection(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink-300 text-sage-700 focus:ring-sage-300"
            />
            <span>I had a C-section — hide anything that loads the abs prone until I'm cleared.</span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={cleared}
              onChange={(e) => setCleared(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink-300 text-sage-700 focus:ring-sage-300"
            />
            <span>
              I've been cleared by my OB, midwife, or pelvic-floor PT to start
              gentle movement.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink-300 text-sage-700 focus:ring-sage-300"
            />
            <span>
              I understand this app is informational only and will stop if
              anything feels wrong.
            </span>
          </label>
        </div>

        <button
          disabled={!canContinue}
          onClick={start}
          className="btn-primary w-full"
        >
          Start Day 1
        </button>
      </div>
    </div>
  );
}
