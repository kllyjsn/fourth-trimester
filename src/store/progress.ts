import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Feeling =
  | "energized"
  | "tired"
  | "sore"
  | "leaking"
  | "anxious"
  | "good";

export interface CompletedEntry {
  dayIndex: number;
  isoDate: string; // YYYY-MM-DD
  completedExerciseIds: string[];
  feeling?: Feeling;
}

export interface ProgressState {
  /** Whether the user has completed the welcome flow. */
  onboarded: boolean;
  /** Name the user gave (optional, local only). */
  name: string;
  /** Weeks postpartum at onboarding — sets starting phase. */
  startWeeksPostpartum: number;
  /** ISO date (YYYY-MM-DD) of the user's Day 1 in the app. */
  startDate: string;
  /** Whether the user has been cleared by their provider. */
  cleared: boolean;
  /** Whether the user had a C-section. */
  csection: boolean;
  /** Self-reported active diastasis (> 2 fingers gap). */
  activeDiastasis: boolean;
  /** Hop-test passed: unlocks impact work in Phase 3. */
  hopTestPassed: boolean;
  /** Completed sessions keyed by dayIndex. */
  completed: Record<number, CompletedEntry>;
  /** Preferred reminder time (HH:MM, local). Optional. */
  reminderTime?: string;

  // actions
  setOnboarded: (v: boolean) => void;
  setName: (v: string) => void;
  setStartWeeksPostpartum: (v: number) => void;
  setCleared: (v: boolean) => void;
  setCsection: (v: boolean) => void;
  setActiveDiastasis: (v: boolean) => void;
  setHopTestPassed: (v: boolean) => void;
  setReminderTime: (v: string | undefined) => void;
  completeSession: (entry: CompletedEntry) => void;
  reset: () => void;
}

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      onboarded: false,
      name: "",
      startWeeksPostpartum: 0,
      startDate: todayIso(),
      cleared: false,
      csection: false,
      activeDiastasis: false,
      hopTestPassed: false,
      completed: {},

      setOnboarded: (v) => set({ onboarded: v }),
      setName: (v) => set({ name: v }),
      setStartWeeksPostpartum: (v) => set({ startWeeksPostpartum: v }),
      setCleared: (v) => set({ cleared: v }),
      setCsection: (v) => set({ csection: v }),
      setActiveDiastasis: (v) => set({ activeDiastasis: v }),
      setHopTestPassed: (v) => set({ hopTestPassed: v }),
      setReminderTime: (v) => set({ reminderTime: v }),
      completeSession: (entry) =>
        set((s) => ({
          completed: { ...s.completed, [entry.dayIndex]: entry },
        })),
      reset: () =>
        set({
          onboarded: false,
          name: "",
          startWeeksPostpartum: 0,
          startDate: todayIso(),
          cleared: false,
          csection: false,
          activeDiastasis: false,
          hopTestPassed: false,
          completed: {},
        }),
    }),
    {
      name: "fourth-trimester.progress.v1",
    },
  ),
);

/**
 * Today's day index: days since startDate, plus any "head start" the user
 * had when onboarding (weeks postpartum already completed count as weeks 1..N).
 *
 * We deliberately do NOT skip days the user missed — this keeps "today" anchored
 * to the calendar rather than forcing them to catch up.
 */
export function computeTodayIndex(state: ProgressState): number {
  const start = new Date(state.startDate + "T00:00:00");
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  const headStartDays = Math.max(0, state.startWeeksPostpartum) * 7;
  return Math.max(0, diffDays + headStartDays);
}

export function computeStreak(state: ProgressState): number {
  const today = computeTodayIndex(state);
  let streak = 0;
  for (let i = today; i >= 0; i--) {
    if (state.completed[i]) streak++;
    else if (i === today) {
      // today not done yet — don't break the streak retroactively
      continue;
    } else break;
  }
  return streak;
}
