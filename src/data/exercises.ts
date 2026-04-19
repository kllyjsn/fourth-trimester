export type Phase = 1 | 2 | 3;

export type ExerciseCategory =
  | "breath"
  | "mobility"
  | "core"
  | "strength"
  | "cardio"
  | "cooldown";

export interface Exercise {
  id: string;
  name: string;
  phase: Phase;
  category: ExerciseCategory;
  /** Seconds (per side if unilateral × sides handled in session). */
  durationSec: number;
  /** If true, the app will run the timer twice (one per side). */
  unilateral?: boolean;
  /** Whether the hop-test must be passed before this exercise is shown. */
  requiresHopTest?: boolean;
  /** Whether the user should avoid this with active diastasis recti. */
  avoidIfDiastasis?: boolean;
  /** Short one-line summary used on cards. */
  summary: string;
  /** Full instructions, in order. */
  howTo: string[];
  /** Key form cues shown as captions during the session. */
  cues: string[];
  /** Signs to stop immediately. */
  redFlags: string[];
  /** C-section safe? */
  csectionSafe: boolean;
  /** Relative path to the video (mp4). May not exist yet. */
  videoSrc: string;
  /** Prompt used to generate the instructional video. */
  videoPrompt: string;
}

const SUBJECT =
  "A woman in her early thirties with her hair tied back, postpartum, wearing a soft sage-green athletic tank top and dark grey leggings, calm and focused expression, in a bright minimalist home living room with a wooden floor, a cream-colored rug, and a large window with soft natural light. No baby in frame. No text or watermarks. No equipment unless specified. Realistic human anatomy. Slow, controlled tempo suitable for an instructional demonstration. Camera: static, eye-level three-quarter angle, medium shot. 8 seconds.";

export const EXERCISES: Exercise[] = [
  // ---------- Phase 1 ----------
  {
    id: "diaphragmatic-breath",
    name: "360° Diaphragmatic Breath",
    phase: 1,
    category: "breath",
    durationSec: 60,
    summary:
      "Reconnect breath, core, and pelvic floor with slow, expansive breathing.",
    howTo: [
      "Lie on your back with knees bent, feet flat on the floor.",
      "Rest one hand on your ribs, the other on your lower belly.",
      "Inhale slowly through your nose, expanding your ribs sideways and your belly.",
      "Exhale through pursed lips, gently drawing your belly button toward your spine and lifting your pelvic floor.",
    ],
    cues: [
      "Inhale: ribs expand 360°",
      "Exhale: pelvic floor lifts",
      "Soft jaw, soft shoulders",
    ],
    redFlags: ["Dizziness", "Sharp pain"],
    csectionSafe: true,
    videoSrc: "/videos/diaphragmatic-breath.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat, knees bent, feet flat. One hand on her ribs, the other on her lower belly. She inhales slowly, her ribs expanding outward and belly rising gently, then exhales slowly through pursed lips, her belly softly drawing in. Very gentle, restorative motion. No crunching, no head lift.`,
  },
  {
    id: "pelvic-tilts",
    name: "Pelvic Tilts",
    phase: 1,
    category: "core",
    durationSec: 45,
    summary:
      "Wake up the deep core by gently tilting the pelvis and flattening the lower back.",
    howTo: [
      "Lie on your back, knees bent, feet flat, arms at your sides.",
      "Exhale and press your lower back into the floor by tilting your pelvis up.",
      "Inhale and release back to neutral.",
    ],
    cues: [
      "Small, controlled movement",
      "Exhale to tilt, inhale to release",
      "No bracing or breath-holding",
    ],
    redFlags: ["Low-back pain", "Doming of the belly"],
    csectionSafe: true,
    videoSrc: "/videos/pelvic-tilts.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat with knees bent and feet flat on the floor. She slowly tilts her pelvis, pressing her lower back flat into the mat, then releases it to neutral. Small, controlled motion repeated at a slow tempo. No crunch, head stays on the mat.`,
  },
  {
    id: "heel-slides",
    name: "Supine Heel Slides",
    phase: 1,
    category: "core",
    durationSec: 45,
    summary: "Gentle deep-core activation by sliding one heel away at a time.",
    howTo: [
      "Lie on your back, knees bent, feet flat, arms at your sides.",
      "Exhale, engage your deep core, and slowly slide one heel out until the leg is almost straight.",
      "Inhale and slide the heel back to the start.",
      "Alternate sides.",
    ],
    cues: [
      "Slide only as far as you can without your belly doming",
      "Exhale on the slide out",
      "Pelvis stays level",
    ],
    redFlags: ["Doming", "Low-back pain"],
    csectionSafe: true,
    videoSrc: "/videos/heel-slides.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat, knees bent, feet flat. She slowly slides her right heel along the mat until her right leg is nearly straight, then slides it back. Then she repeats with her left leg. Very slow, controlled, pelvis staying flat.`,
  },
  {
    id: "gentle-glute-bridge",
    name: "Gentle Glute Bridge",
    phase: 1,
    category: "strength",
    durationSec: 45,
    summary:
      "A small, breath-led lift to activate the glutes and posterior chain.",
    howTo: [
      "Lie on your back, knees bent, feet flat, hip-width apart.",
      "Exhale, press through your heels, and lift your hips a small amount off the floor.",
      "Hold for a breath, then lower slowly.",
    ],
    cues: [
      "Drive from the heels",
      "Ribs stay down — no back arch",
      "Squeeze glutes at the top",
    ],
    redFlags: ["Low-back pain", "Pelvic heaviness"],
    csectionSafe: true,
    videoSrc: "/videos/gentle-glute-bridge.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat, knees bent, feet flat on the floor hip-width apart, arms by her sides. She exhales and slowly lifts her hips a small amount off the mat, squeezing her glutes, then slowly lowers back down. Small, gentle range of motion. Ribs stay down, no back arching.`,
  },
  {
    id: "cat-cow",
    name: "Cat-Cow",
    phase: 1,
    category: "mobility",
    durationSec: 60,
    summary: "Segmental spine mobility on hands and knees, paired with breath.",
    howTo: [
      "Come to hands and knees with wrists under shoulders and knees under hips.",
      "Inhale, drop your belly and lift your chest and tailbone (cow).",
      "Exhale, round your spine toward the ceiling and tuck your tailbone (cat).",
    ],
    cues: [
      "Move slowly with your breath",
      "Let each vertebra move",
      "Soft elbows, relaxed neck",
    ],
    redFlags: ["Wrist pain (try forearms)", "Low-back pinching"],
    csectionSafe: true,
    videoSrc: "/videos/cat-cow.mp4",
    videoPrompt: `${SUBJECT} She is on hands and knees on a yoga mat with wrists under shoulders and knees under hips. She inhales and gently lets her belly drop while her chest and tailbone lift, then exhales and rounds her spine toward the ceiling while tucking her chin. Slow, fluid, breath-led motion.`,
  },
  {
    id: "book-openers",
    name: "Side-Lying Book Openers",
    phase: 1,
    category: "mobility",
    durationSec: 45,
    unilateral: true,
    summary:
      "Open up the chest and upper back — great counter to nursing posture.",
    howTo: [
      "Lie on your side with knees stacked and bent at 90°.",
      "Extend both arms straight in front of you, palms together.",
      "Keeping knees together, slowly rotate the top arm open like a book, following it with your eyes.",
      "Pause, then return.",
    ],
    cues: [
      "Knees stay stacked",
      "Let the gaze follow the hand",
      "Only go as far as feels good",
    ],
    redFlags: ["Low-back or shoulder pain"],
    csectionSafe: true,
    videoSrc: "/videos/book-openers.mp4",
    videoPrompt: `${SUBJECT} She is lying on her right side on a yoga mat, knees stacked and bent at ninety degrees, both arms extended in front with palms together. She slowly rotates her top left arm open across her body and behind her, her gaze following her hand, then brings it back. Smooth, controlled rotation. Knees stay stacked.`,
  },
  {
    id: "seated-neck-shoulder-rolls",
    name: "Seated Neck & Shoulder Rolls",
    phase: 1,
    category: "mobility",
    durationSec: 45,
    summary:
      "Release upper-body tension from carrying and feeding, seated and comfortable.",
    howTo: [
      "Sit tall with your feet flat on the floor.",
      "Slowly roll your shoulders backward, making big circles, for several breaths.",
      "Then gently tilt your ear to your shoulder and hold, switching sides.",
    ],
    cues: ["Long neck, tall spine", "Breathe into the stretch", "No forcing"],
    redFlags: ["Dizziness", "Sharp neck pain"],
    csectionSafe: true,
    videoSrc: "/videos/seated-neck-shoulder-rolls.mp4",
    videoPrompt: `${SUBJECT} She is sitting cross-legged on a yoga mat with a tall, relaxed spine. She slowly rolls her shoulders backward in big circles, then gently tilts her right ear toward her right shoulder and holds, then switches to the other side. Calm, gentle movement.`,
  },
  {
    id: "ankle-pumps",
    name: "Ankle Pumps & Calf Raises",
    phase: 1,
    category: "cardio",
    durationSec: 45,
    summary:
      "Help circulation and reduce swelling — safe from day one (with clearance).",
    howTo: [
      "Sit or stand tall with feet hip-width apart.",
      "Slowly point and flex your feet, or rise onto the balls of your feet and lower.",
      "Repeat at an easy pace.",
    ],
    cues: [
      "Control the lowering",
      "Breathe normally",
      "Hold onto a wall if balance is off",
    ],
    redFlags: ["Calf pain or redness (see a clinician)"],
    csectionSafe: true,
    videoSrc: "/videos/ankle-pumps.mp4",
    videoPrompt: `${SUBJECT} She is standing barefoot on a yoga mat with feet hip-width apart, one hand lightly resting on a wall for balance. She slowly rises onto the balls of her feet, holds briefly, then lowers her heels back down. Controlled, gentle tempo.`,
  },
  {
    id: "easy-walk",
    name: "Easy Walk",
    phase: 1,
    category: "cardio",
    durationSec: 300,
    summary: "A calm 5-minute walk — indoors, with the stroller, or outside.",
    howTo: [
      "Walk at a conversational pace.",
      "Focus on tall posture and an easy stride.",
      "Breathe through your nose if you can.",
    ],
    cues: [
      "Relaxed shoulders",
      "Full foot-to-floor contact",
      "Nasal breathing",
    ],
    redFlags: [
      "Pelvic heaviness",
      "Increased bleeding",
      "Pain — stop and rest",
    ],
    csectionSafe: true,
    videoSrc: "/videos/easy-walk.mp4",
    videoPrompt: `${SUBJECT} She is walking at a calm, conversational pace along a sunny sidewalk lined with green grass and soft trees. Tall posture, relaxed shoulders, gentle stride. Camera tracks her from the side at a steady distance.`,
  },

  // ---------- Phase 2 ----------
  {
    id: "glute-bridge",
    name: "Glute Bridge",
    phase: 2,
    category: "strength",
    durationSec: 45,
    summary: "A stronger posterior-chain builder — drive through the heels.",
    howTo: [
      "Lie on your back, knees bent, feet flat, hip-width apart.",
      "Exhale, press through your heels, and lift your hips until there's a straight line from knees to shoulders.",
      "Squeeze your glutes at the top, then lower with control.",
    ],
    cues: [
      "Drive from the heels",
      "Ribs stay down",
      "Squeeze glutes at the top",
    ],
    redFlags: ["Low-back pain"],
    csectionSafe: true,
    videoSrc: "/videos/glute-bridge.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat, knees bent, feet flat hip-width apart. She exhales and lifts her hips up to form a straight line from knees to shoulders, pausing at the top to squeeze her glutes, then lowers with control. Controlled, steady reps.`,
  },
  {
    id: "bird-dog",
    name: "Bird-Dog",
    phase: 2,
    category: "core",
    durationSec: 45,
    unilateral: true,
    summary: "Deep-core stability without bracing — extend opposite arm & leg.",
    howTo: [
      "Start on hands and knees, wrists under shoulders, knees under hips.",
      "Exhale and slowly extend your right arm forward and left leg back.",
      "Pause, then return. Alternate sides.",
    ],
    cues: [
      "Ribs stay over hips",
      "Imagine balancing a glass of water on your back",
      "Extend long, don't lift high",
    ],
    redFlags: ["Low-back pain", "Doming"],
    csectionSafe: true,
    videoSrc: "/videos/bird-dog.mp4",
    videoPrompt: `${SUBJECT} She is on hands and knees on a yoga mat, wrists under shoulders and knees under hips. She slowly extends her right arm forward and her left leg back to parallel with the floor, pauses, then returns. Then she alternates to the other side. Back stays flat and level throughout.`,
  },
  {
    id: "squat-to-chair",
    name: "Squat to Chair",
    phase: 2,
    category: "strength",
    durationSec: 45,
    summary: "Bodyweight squat with a chair behind you to set the depth.",
    howTo: [
      "Stand in front of a sturdy chair, feet hip-width apart, toes slightly out.",
      "Inhale and sit your hips back and down, tapping the chair with your bum.",
      "Exhale and drive through your feet to stand, squeezing your glutes at the top.",
    ],
    cues: [
      "Chest tall, knees track over toes",
      "Tap, don't sit",
      "Drive through the full foot",
    ],
    redFlags: ["Knee pain", "Pelvic heaviness"],
    csectionSafe: true,
    videoSrc: "/videos/squat-to-chair.mp4",
    videoPrompt: `${SUBJECT} She is standing in front of a simple wooden chair, feet hip-width apart. She slowly sits back and down until her bum taps the chair, then stands back up driving through her feet. Upright chest, knees tracking over toes. Controlled reps.`,
  },
  {
    id: "wall-pushup",
    name: "Wall Push-Up",
    phase: 2,
    category: "strength",
    durationSec: 45,
    summary: "Build pressing strength without loading the core too much.",
    howTo: [
      "Stand an arm's length from a wall, palms flat on the wall at shoulder height.",
      "Keeping your body in a straight line, bend your elbows and lower your chest toward the wall.",
      "Press back to the start.",
    ],
    cues: [
      "Body stays in one long line",
      "Elbows track back at 45°",
      "Exhale on the press",
    ],
    redFlags: ["Wrist pain", "Low-back arch"],
    csectionSafe: true,
    videoSrc: "/videos/wall-pushup.mp4",
    videoPrompt: `${SUBJECT} She is standing an arm's length from a plain white interior wall, palms flat on the wall at shoulder height. She bends her elbows and lowers her chest toward the wall, keeping her body in a straight line, then presses back. Slow, controlled reps.`,
  },
  {
    id: "dead-bug",
    name: "Dead Bug",
    phase: 2,
    category: "core",
    durationSec: 45,
    unilateral: true,
    avoidIfDiastasis: false,
    summary: "Anti-extension core work that's gentle on the abdominal wall.",
    howTo: [
      "Lie on your back with arms straight up and knees bent at 90° over hips (tabletop).",
      "Exhale and slowly lower your right arm overhead and your left leg toward the floor.",
      "Inhale and return. Alternate sides.",
    ],
    cues: [
      "Lower back presses into the floor",
      "Move only as far as you can without doming",
      "Exhale on the reach",
    ],
    redFlags: ["Doming", "Low-back pain"],
    csectionSafe: true,
    videoSrc: "/videos/dead-bug.mp4",
    videoPrompt: `${SUBJECT} She is lying on her back on a yoga mat, both arms extended straight up toward the ceiling and knees bent in tabletop. She slowly lowers her right arm overhead and her left leg out toward the floor, then returns and alternates. Lower back stays pressed into the mat. Controlled, steady tempo.`,
  },
  {
    id: "clamshell",
    name: "Side-Lying Clamshell",
    phase: 2,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "Wake up the glute medius — essential for hip and pelvic stability.",
    howTo: [
      "Lie on your side with knees stacked and bent at 45°, heels in line with your spine.",
      "Keeping your heels together, lift your top knee, opening like a clamshell.",
      "Pause, then lower with control. Switch sides.",
    ],
    cues: [
      "Keep hips stacked — don't roll back",
      "Slow lift, controlled lower",
      "Feel it in the side of your glute",
    ],
    redFlags: ["Hip pinching"],
    csectionSafe: true,
    videoSrc: "/videos/clamshell.mp4",
    videoPrompt: `${SUBJECT} She is lying on her right side on a yoga mat, knees stacked and bent at forty-five degrees, heels together. She slowly lifts her top left knee, opening like a clamshell, keeping her heels together and her hips stacked, then lowers with control. Smooth, controlled reps.`,
  },
  {
    id: "hip-abduction",
    name: "Standing Hip Abduction",
    phase: 2,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "Side-leg lift to build pelvic stability in standing.",
    howTo: [
      "Stand tall with one hand lightly on a wall for balance.",
      "Keeping your leg straight and toes pointing forward, slowly lift it out to the side.",
      "Pause, then lower with control. Switch sides.",
    ],
    cues: [
      "Tall torso — no leaning",
      "Lift from the outer hip",
      "Toes forward, not turned out",
    ],
    redFlags: ["Hip pinching"],
    csectionSafe: true,
    videoSrc: "/videos/hip-abduction.mp4",
    videoPrompt: `${SUBJECT} She is standing tall on her right leg, left hand lightly resting on a wall for balance. She slowly lifts her left leg out to the side, keeping the leg straight and toes pointing forward, then lowers it. Torso stays upright, no leaning. Controlled tempo.`,
  },
  {
    id: "reverse-lunge",
    name: "Stationary Reverse Lunge",
    phase: 2,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "Unilateral lower-body work with a gentler knee angle than forward lunges.",
    howTo: [
      "Stand tall, feet hip-width apart.",
      "Step one foot back and lower into a lunge until both knees are roughly 90°.",
      "Drive through the front heel to return. Alternate sides.",
    ],
    cues: [
      "Front knee over the ankle",
      "Tall torso",
      "Control the back-knee descent",
    ],
    redFlags: ["Knee pain", "Pelvic heaviness"],
    csectionSafe: true,
    videoSrc: "/videos/reverse-lunge.mp4",
    videoPrompt: `${SUBJECT} She is standing tall on a yoga mat, feet hip-width apart. She steps her right foot back and lowers into a reverse lunge, both knees bending to about ninety degrees, then drives through her front heel to return to standing. Then she alternates. Upright torso, controlled motion.`,
  },
  {
    id: "step-up",
    name: "Step-Up",
    phase: 2,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "Unilateral strength using a low step — great for real-life loading.",
    howTo: [
      "Stand in front of a low, stable step.",
      "Place one foot fully on the step. Drive through that heel to stand tall.",
      "Lower with control and repeat. Switch sides.",
    ],
    cues: [
      "Full foot on the step",
      "Stand tall, no hip hitch",
      "Slow, quiet landing",
    ],
    redFlags: ["Knee pain"],
    csectionSafe: true,
    videoSrc: "/videos/step-up.mp4",
    videoPrompt: `${SUBJECT} She is standing in front of a low wooden step. She places her right foot fully on the step and drives through her heel to stand tall on the step, then steps back down with control. Steady, quiet repetitions.`,
  },
  {
    id: "superman-hold",
    name: "Superman Hold",
    phase: 2,
    category: "core",
    durationSec: 30,
    summary: "Low back, glute, and shoulder strengthener — prone and gentle.",
    howTo: [
      "Lie on your stomach with arms extended overhead and legs straight.",
      "Exhale and lift your arms, chest, and legs slightly off the floor.",
      "Hold for a breath, then lower.",
    ],
    cues: [
      "Long neck — gaze at the floor",
      "Small lift, big engagement",
      "Breathe throughout",
    ],
    redFlags: [
      "Low-back pinching",
      "Avoid if <6 weeks postpartum or C-section not cleared",
    ],
    csectionSafe: false,
    videoSrc: "/videos/superman-hold.mp4",
    videoPrompt: `${SUBJECT} She is lying prone on a yoga mat, arms extended overhead and legs straight. She gently lifts her arms, chest, and legs a small distance off the mat, holds briefly, then lowers. Gentle, not extreme. Gaze stays down toward the mat.`,
  },
  {
    id: "marching-in-place",
    name: "March in Place",
    phase: 2,
    category: "cardio",
    durationSec: 60,
    summary: "Low-impact cardio with tall posture — perfect for rainy days.",
    howTo: [
      "Stand tall, feet hip-width apart.",
      "Lift one knee, then the other, in a controlled marching rhythm.",
      "Swing your arms naturally.",
    ],
    cues: [
      "Tall torso, relaxed shoulders",
      "Land softly",
      "Breathe steadily",
    ],
    redFlags: ["Pelvic heaviness"],
    csectionSafe: true,
    videoSrc: "/videos/marching-in-place.mp4",
    videoPrompt: `${SUBJECT} She is standing tall on a yoga mat, marching in place with a calm, controlled rhythm, lifting one knee then the other while swinging her arms naturally. Upright posture, soft landings.`,
  },
  {
    id: "brisk-walk",
    name: "Brisk Walk",
    phase: 2,
    category: "cardio",
    durationSec: 300,
    summary: "Pick up the pace — conversational but purposeful.",
    howTo: [
      "Walk at a brisker pace than Phase 1.",
      "You should be able to talk but not sing.",
      "Hold a tall posture.",
    ],
    cues: [
      "Breathe through your nose when you can",
      "Swing your arms",
      "Land heel to toe",
    ],
    redFlags: ["Pelvic heaviness", "Pain"],
    csectionSafe: true,
    videoSrc: "/videos/brisk-walk.mp4",
    videoPrompt: `${SUBJECT} She is walking at a brisk, purposeful pace along a tree-lined park path on a sunny morning. Tall posture, confident stride, arms swinging naturally. Camera tracks her from the side.`,
  },

  // ---------- Phase 3 ----------
  {
    id: "split-squat",
    name: "Split Squat (Bodyweight)",
    phase: 3,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "A staggered stance squat that loads one leg at a time.",
    howTo: [
      "Stand in a split stance — one foot forward, one back, about a stride apart.",
      "Lower your back knee toward the floor until both knees are bent ~90°.",
      "Drive through the front heel to return. Switch sides after the interval.",
    ],
    cues: [
      "Front knee over ankle",
      "Tall torso — only a slight lean",
      "Control the descent",
    ],
    redFlags: ["Knee pain", "Pelvic heaviness"],
    csectionSafe: true,
    videoSrc: "/videos/split-squat.mp4",
    videoPrompt: `${SUBJECT} She is standing on a yoga mat in a split stance with her right foot forward and left foot back about a stride apart. She lowers her left knee toward the mat until both knees are bent at about ninety degrees, then drives through her front heel to return. Slow, controlled reps, upright torso.`,
  },
  {
    id: "hip-thrust",
    name: "Floor Hip Thrust",
    phase: 3,
    category: "strength",
    durationSec: 45,
    summary: "Stronger glute extension with a fuller range than the bridge.",
    howTo: [
      "Sit on the floor with your upper back against a low couch or sturdy surface, feet flat hip-width apart.",
      "Exhale and drive through your heels, lifting your hips until your torso is parallel to the floor.",
      "Squeeze your glutes at the top, then lower with control.",
    ],
    cues: [
      "Chin tucked, ribs down",
      "Drive through the heels",
      "Squeeze at the top",
    ],
    redFlags: ["Low-back pain"],
    csectionSafe: true,
    videoSrc: "/videos/hip-thrust.mp4",
    videoPrompt: `${SUBJECT} She is seated on the floor with her upper back leaning against the edge of a low couch, feet flat on the floor hip-width apart. She drives through her heels and lifts her hips until her torso is parallel to the floor, pauses to squeeze her glutes, then lowers with control.`,
  },
  {
    id: "pushup",
    name: "Push-Up (or from knees)",
    phase: 3,
    category: "strength",
    durationSec: 45,
    summary: "A full bodyweight press — regress to knees as needed.",
    howTo: [
      "Come to a plank or knee-plank with hands under shoulders.",
      "Lower your chest toward the floor, elbows tracking back at ~45°.",
      "Exhale and press back to the start.",
    ],
    cues: [
      "Body in one long line",
      "Ribs stay knitted down",
      "No sag in the belly",
    ],
    redFlags: ["Doming", "Low-back pain", "Wrist pain"],
    csectionSafe: true,
    videoSrc: "/videos/pushup.mp4",
    videoPrompt: `${SUBJECT} She is in a knee-plank position on a yoga mat, hands under her shoulders. She bends her elbows and lowers her chest toward the mat, elbows tracking back at forty-five degrees, then presses back up. Controlled, straight line from knees to shoulders.`,
  },
  {
    id: "plank-shoulder-tap",
    name: "Plank Shoulder Tap",
    phase: 3,
    category: "core",
    durationSec: 40,
    avoidIfDiastasis: true,
    summary: "Anti-rotation core work in a high plank.",
    howTo: [
      "Come to a high plank with hands under shoulders and feet wider than hip-width.",
      "Slowly tap your left shoulder with your right hand, then switch.",
      "Keep your hips level the entire time.",
    ],
    cues: [
      "Wide feet = more stability",
      "Hips stay square",
      "Small, slow taps",
    ],
    redFlags: ["Doming", "Low-back sag"],
    csectionSafe: true,
    videoSrc: "/videos/plank-shoulder-tap.mp4",
    videoPrompt: `${SUBJECT} She is in a high plank position on a yoga mat with hands under her shoulders and feet wider than hip-width. She slowly taps her left shoulder with her right hand, then the right shoulder with her left hand, keeping her hips level and body in one long line. Slow, controlled alternation.`,
  },
  {
    id: "single-leg-deadlift",
    name: "Single-Leg Deadlift (Bodyweight)",
    phase: 3,
    category: "strength",
    durationSec: 45,
    unilateral: true,
    summary: "Balance, glute, and hamstring strength on one leg.",
    howTo: [
      "Stand tall, fingertips lightly on a wall if needed.",
      "Hinge at the hips, sending one leg back and your torso forward — keep them roughly parallel to the floor.",
      "Drive through the standing heel to return.",
    ],
    cues: [
      "Long spine — no rounding",
      "Standing knee softly bent",
      "Move slowly — this is a balance move",
    ],
    redFlags: ["Low-back pain"],
    csectionSafe: true,
    videoSrc: "/videos/single-leg-deadlift.mp4",
    videoPrompt: `${SUBJECT} She is standing tall on her right leg on a yoga mat, fingertips lightly resting on a nearby wall for balance. She hinges at the hips, sending her left leg back and her torso forward so they are nearly parallel to the floor, then returns to standing. Slow, controlled, with a long spine.`,
  },
  {
    id: "walk-run-intervals",
    name: "Walk-Run Intervals",
    phase: 3,
    category: "cardio",
    durationSec: 300,
    requiresHopTest: true,
    summary:
      "4 minutes walk / 1 minute light jog — only after passing the hop test.",
    howTo: [
      "Start with 2 minutes of brisk walking.",
      "Jog easily for 1 minute at a conversational pace.",
      "Walk 4 minutes, then repeat as comfortable.",
    ],
    cues: [
      "Land softly, full foot",
      "Tall posture, arms relaxed",
      "Stop at any heaviness or leakage",
    ],
    redFlags: ["Leakage", "Pelvic heaviness", "Pain"],
    csectionSafe: true,
    videoSrc: "/videos/walk-run-intervals.mp4",
    videoPrompt: `${SUBJECT} She is jogging at an easy, conversational pace along a sunny tree-lined park path. Tall posture, soft landings, arms relaxed. Camera tracks her from the side.`,
  },
  {
    id: "lateral-bound",
    name: "Low Lateral Bound",
    phase: 3,
    category: "cardio",
    durationSec: 40,
    requiresHopTest: true,
    summary: "A small sideways hop — progressive impact only.",
    howTo: [
      "Stand on one leg with a soft knee.",
      "Push off sideways and land softly on the other leg.",
      "Pause, then bound back. Keep the bound small.",
    ],
    cues: [
      "Soft knee on landing",
      "Stick the landing for a beat",
      "Small hops, not big leaps",
    ],
    redFlags: ["Leakage", "Pelvic heaviness", "Knee pain"],
    csectionSafe: true,
    videoSrc: "/videos/lateral-bound.mp4",
    videoPrompt: `${SUBJECT} She is on a yoga mat, balanced on her right leg with a soft knee. She pushes off sideways and lands softly on her left leg, pauses to stick the landing, then bounds back. Small, controlled lateral hops. Soft, quiet landings.`,
  },

  // ---------- Cool-down (all phases) ----------
  {
    id: "childs-pose",
    name: "Child's Pose",
    phase: 1,
    category: "cooldown",
    durationSec: 60,
    summary: "A restorative stretch to close the session.",
    howTo: [
      "From hands and knees, sit your hips back toward your heels.",
      "Let your forehead rest on the floor, arms extended forward or by your sides.",
      "Breathe deeply.",
    ],
    cues: ["Soft belly", "Wide knees if needed", "Breathe into your back"],
    redFlags: ["Knee pain (place a pillow behind the knees)"],
    csectionSafe: true,
    videoSrc: "/videos/childs-pose.mp4",
    videoPrompt: `${SUBJECT} She is on a yoga mat in child's pose — hips resting back on her heels, forehead resting on the mat, arms extended forward on the mat. She breathes slowly and calmly. Still, restorative pose with soft, gentle micro-movements of the breath.`,
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
