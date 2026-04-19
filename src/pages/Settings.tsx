import { useNavigate } from "react-router-dom";
import { useProgress } from "../store/progress";

export function Settings() {
  const nav = useNavigate();
  const state = useProgress();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-sage-900">Settings</h1>
      </header>

      <section className="card p-5 space-y-4">
        <Row label="Name" htmlFor="settings-name">
          <input
            id="settings-name"
            value={state.name}
            maxLength={40}
            onChange={(e) => useProgress.getState().setName(e.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-sm focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300"
          />
        </Row>
        <Row label="Cleared by provider">
          <Toggle
            value={state.cleared}
            onChange={(v) => useProgress.getState().setCleared(v)}
          />
        </Row>
        <Row label="Had a C-section">
          <Toggle
            value={state.csection}
            onChange={(v) => useProgress.getState().setCsection(v)}
          />
        </Row>
        <Row label="Active diastasis (2+ fingers)">
          <Toggle
            value={state.activeDiastasis}
            onChange={(v) => useProgress.getState().setActiveDiastasis(v)}
          />
        </Row>
        <Row label="Passed hop test">
          <Toggle
            value={state.hopTestPassed}
            onChange={(v) => useProgress.getState().setHopTestPassed(v)}
          />
        </Row>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-display text-lg text-sage-900">Data</h2>
        <p className="text-sm text-ink-600">
          All your progress is stored locally on this device. Nothing is sent
          anywhere.
        </p>
        <button
          className="btn-secondary"
          onClick={() => {
            if (confirm("Reset all progress? This can't be undone.")) {
              useProgress.getState().reset();
              nav("/welcome", { replace: true });
            }
          }}
        >
          Reset progress
        </button>
      </section>
    </div>
  );
}

function Row({
  label,
  children,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-ink-700"
      >
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${value ? "bg-sage-600" : "bg-ink-200"}`}
      aria-pressed={value}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${value ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
}
