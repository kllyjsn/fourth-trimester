import { EXERCISES, type Exercise, type Phase } from "./exercises";

export interface SessionPlan {
  dayIndex: number; // 0-based day from user's Day 1
  weekIndex: number; // 0-based week
  phase: Phase;
  title: string;
  subtitle: string;
  isRestDay: boolean;
  /** Ordered list of exercises for the session. */
  exercises: Exercise[];
  /** Target total minutes. */
  totalMinutes: number;
}

function byId(id: string): Exercise {
  const e = EXERCISES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown exercise id: ${id}`);
  return e;
}

function phaseForWeek(weekIndex: number): Phase {
  if (weekIndex < 6) return 1;
  if (weekIndex < 12) return 2;
  return 3;
}

/* -------------------------------------------------------------------------- */
/* Weekly rotations                                                            */
/* -------------------------------------------------------------------------- */

// Phase 1: breath/mobility focused. Each entry is a daily exercise set.
const PHASE_1_WEEK: string[][] = [
  // Mon
  [
    "diaphragmatic-breath",
    "pelvic-tilts",
    "cat-cow",
    "gentle-glute-bridge",
    "easy-walk",
    "childs-pose",
  ],
  // Tue
  [
    "diaphragmatic-breath",
    "heel-slides",
    "book-openers",
    "ankle-pumps",
    "easy-walk",
    "childs-pose",
  ],
  // Wed
  [
    "diaphragmatic-breath",
    "pelvic-tilts",
    "seated-neck-shoulder-rolls",
    "gentle-glute-bridge",
    "easy-walk",
    "childs-pose",
  ],
  // Thu
  [
    "diaphragmatic-breath",
    "heel-slides",
    "cat-cow",
    "ankle-pumps",
    "easy-walk",
    "childs-pose",
  ],
  // Fri
  [
    "diaphragmatic-breath",
    "pelvic-tilts",
    "book-openers",
    "gentle-glute-bridge",
    "easy-walk",
    "childs-pose",
  ],
  // Sat
  [
    "diaphragmatic-breath",
    "heel-slides",
    "seated-neck-shoulder-rolls",
    "cat-cow",
    "easy-walk",
    "childs-pose",
  ],
  // Sun — rest/restorative
  ["diaphragmatic-breath", "cat-cow", "book-openers", "easy-walk", "childs-pose"],
];

// Phase 2: low-impact strength circuits. 2 min warm-up + 10 min circuit + 3 min cool-down.
const PHASE_2_WEEK: string[][] = [
  // Mon
  [
    "cat-cow",
    "glute-bridge",
    "bird-dog",
    "squat-to-chair",
    "wall-pushup",
    "clamshell",
    "childs-pose",
  ],
  // Tue
  [
    "cat-cow",
    "reverse-lunge",
    "dead-bug",
    "hip-abduction",
    "wall-pushup",
    "marching-in-place",
    "childs-pose",
  ],
  // Wed
  [
    "book-openers",
    "step-up",
    "bird-dog",
    "glute-bridge",
    "superman-hold",
    "brisk-walk",
    "childs-pose",
  ],
  // Thu
  [
    "cat-cow",
    "squat-to-chair",
    "clamshell",
    "wall-pushup",
    "dead-bug",
    "marching-in-place",
    "childs-pose",
  ],
  // Fri
  [
    "book-openers",
    "reverse-lunge",
    "hip-abduction",
    "glute-bridge",
    "bird-dog",
    "brisk-walk",
    "childs-pose",
  ],
  // Sat
  [
    "cat-cow",
    "step-up",
    "clamshell",
    "wall-pushup",
    "superman-hold",
    "marching-in-place",
    "childs-pose",
  ],
  // Sun — rest/restorative
  [
    "diaphragmatic-breath",
    "book-openers",
    "cat-cow",
    "brisk-walk",
    "childs-pose",
  ],
];

// Phase 3: strength + progressive impact. Some days gate on hop test.
const PHASE_3_WEEK: string[][] = [
  // Mon — strength
  [
    "cat-cow",
    "split-squat",
    "hip-thrust",
    "pushup",
    "plank-shoulder-tap",
    "brisk-walk",
    "childs-pose",
  ],
  // Tue — light impact + unilateral
  [
    "cat-cow",
    "single-leg-deadlift",
    "step-up",
    "walk-run-intervals",
    "childs-pose",
  ],
  // Wed — strength
  [
    "cat-cow",
    "hip-thrust",
    "split-squat",
    "pushup",
    "bird-dog",
    "brisk-walk",
    "childs-pose",
  ],
  // Thu — power (gated)
  [
    "cat-cow",
    "lateral-bound",
    "hip-thrust",
    "split-squat",
    "walk-run-intervals",
    "childs-pose",
  ],
  // Fri — strength
  [
    "cat-cow",
    "pushup",
    "single-leg-deadlift",
    "plank-shoulder-tap",
    "hip-abduction",
    "brisk-walk",
    "childs-pose",
  ],
  // Sat — light cardio
  [
    "book-openers",
    "marching-in-place",
    "walk-run-intervals",
    "clamshell",
    "childs-pose",
  ],
  // Sun — rest/restorative
  ["diaphragmatic-breath", "cat-cow", "book-openers", "brisk-walk", "childs-pose"],
];

function weekForPhase(phase: Phase): string[][] {
  if (phase === 1) return PHASE_1_WEEK;
  if (phase === 2) return PHASE_2_WEEK;
  return PHASE_3_WEEK;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

const TARGET_SESSION_SEC = 15 * 60;

export function getSessionForDay(
  dayIndex: number,
  opts: {
    csection?: boolean;
    activeDiastasis?: boolean;
    hopTestPassed?: boolean;
  } = {},
): SessionPlan {
  const weekIndex = Math.floor(dayIndex / 7);
  const dayInWeek = dayIndex % 7;
  const phase = phaseForWeek(weekIndex);
  const weekPlan = weekForPhase(phase);
  const ids = weekPlan[dayInWeek % 7];

  let exercises = ids.map(byId);

  // Safety filters.
  if (opts.csection) {
    exercises = exercises.filter((e) => e.csectionSafe);
  }
  if (opts.activeDiastasis) {
    exercises = exercises.filter((e) => !e.avoidIfDiastasis);
  }
  if (!opts.hopTestPassed) {
    exercises = exercises.filter((e) => !e.requiresHopTest);
  }

  const isRestDay = dayInWeek === 6;
  const totalMinutes = Math.round(
    exercises.reduce(
      (acc, e) => acc + e.durationSec * (e.unilateral ? 2 : 1),
      0,
    ) / 60,
  );

  return {
    dayIndex,
    weekIndex,
    phase,
    title: isRestDay
      ? "Restorative day"
      : `Week ${weekIndex + 1} · Day ${dayInWeek + 1}`,
    subtitle: phaseLabel(phase),
    isRestDay,
    exercises,
    totalMinutes,
  };
}

export function phaseLabel(phase: Phase): string {
  switch (phase) {
    case 1:
      return "Phase 1 · Recovery & pelvic-floor connection";
    case 2:
      return "Phase 2 · Foundation & stability";
    case 3:
      return "Phase 3 · Strength & return to impact";
  }
}

export function targetSessionSeconds(): number {
  return TARGET_SESSION_SEC;
}
