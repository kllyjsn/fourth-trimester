import {
  computeStreak,
  computeTodayIndex,
  useProgress,
} from "../store/progress";
import { phaseLabel } from "../data/program";
import { cn } from "../lib/cn";

export function ProgressPage() {
  const state = useProgress();
  const today = computeTodayIndex(state);
  const streak = computeStreak(state);
  const totalDone = Object.keys(state.completed).length;

  const totalDays = Math.max(today + 1, 84); // show at least 12 weeks
  const weeks = Math.ceil(totalDays / 7);
  const phase = today < 42 ? 1 : today < 84 ? 2 : 3;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-sage-900">Progress</h1>
        <p className="mt-1 text-ink-600">
          {phaseLabel(phase)}. You're on Day {today + 1}.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <Stat label="Streak" value={`${streak}`} sub="days" />
        <Stat label="Sessions" value={`${totalDone}`} sub="completed" />
        <Stat label="Phase" value={`${phase}`} sub="of 3" />
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-display text-lg text-sage-900">Calendar</h2>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: weeks * 7 }).map((_, i) => {
            const isFuture = i > today;
            const isDone = !!state.completed[i];
            const isToday = i === today;
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-md ring-1 ring-ink-100",
                  isDone && "bg-sage-600",
                  !isDone && !isFuture && "bg-cream-200",
                  isFuture && "bg-ink-50",
                  isToday && "outline outline-2 outline-sage-800",
                )}
                title={`Day ${i + 1}${isDone ? " — complete" : ""}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-500">
          <Legend color="bg-sage-600" label="Completed" />
          <Legend color="bg-cream-200" label="Missed" />
          <Legend color="bg-ink-50" label="Upcoming" />
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="card p-4">
      <div className="text-xs uppercase tracking-wider text-ink-500">
        {label}
      </div>
      <div className="mt-1 font-display text-3xl text-sage-900">{value}</div>
      <div className="text-xs text-ink-500">{sub}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded-sm", color)} />
      <span>{label}</span>
    </div>
  );
}
