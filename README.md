# Fourth Trimester

A calm, daily **15-minute postpartum recovery** companion. Every exercise is
demonstrated by a short AI-generated instructional video so you can see
exactly what the movement looks like — no ambiguity.

**Bodyweight and movement only.** No gym, no equipment. Walks and light
running count.

## Program at a glance

A 12-week, 3-phase program based on standard postpartum rehab guidance
(ACOG, pelvic-floor PT consensus, [BodySpec's 12-week blueprint][bodyspec]):

| Phase | Weeks | Focus |
|------:|:-----:|:------|
| 1 | 0–6  | Recovery, mobility, pelvic-floor connection |
| 2 | 6–12 | Low-impact strength, stability, unilateral work |
| 3 | 12+  | Progressive strength, return to impact (gated by hop test) |

Each daily session is ~15 minutes and rotates through a curated pool of
bodyweight movements (see [`src/data/exercises.ts`](src/data/exercises.ts) and
[`src/data/program.ts`](src/data/program.ts)).

## Safety features

- Onboarding gate asks you to confirm clearance from your OB, midwife, or
  pelvic-floor PT.
- **Diastasis recti self-check** automatically removes planks / shoulder-tap
  planks if you report a gap.
- **C-section mode** hides prone abdominal work until you mark yourself
  cleared.
- **Hop-test gate** keeps running and lateral bounds locked until you pass it.
- Every exercise lists red-flag signs to stop (leakage, heaviness, pain).
- All progress is stored **locally** (localStorage). Nothing is sent anywhere.

## Tech stack

- React 18 + Vite 6 + TypeScript
- Tailwind CSS (sage / cream palette)
- Zustand for persisted local state
- React Router 7
- Lucide icons, Fraunces + Inter via Google Fonts

## Video pipeline

Demonstration clips are generated ahead of time with **Google Veo 3.1 Fast**
via the Gemini API (chosen for the most realistic human motion currently
available — see [Veo 3 vs Sora 2 comparison][veo-vs-sora] and
[2026 roundup][2026-roundup]). Each clip is a silent 8-second loop showing
correct form.

Generation is a one-shot build-time step, not runtime:

```bash
# requires GEMINI_API_KEY in env
npm run generate-videos
```

The script iterates over every exercise in `src/data/exercises.ts`, uses each
exercise's `videoPrompt`, and writes MP4s to `public/videos/`.

## Development

```bash
npm install
npm run dev        # local dev at http://localhost:5173
npm run build      # production build
npm run lint
npm run typecheck
```

## Disclaimer

This app is informational only and is not medical advice. Always defer to your
OB, midwife, or pelvic-floor physiotherapist.

[bodyspec]: https://www.bodyspec.com/blog/post/the_ultimate_12week_postpartum_fitness_blueprint
[veo-vs-sora]: https://www.veo3ai.io/blog/veo-3-vs-sora-2-ultimate-comparison-2026
[2026-roundup]: https://lushbinary.com/blog/ai-video-generation-sora-veo-kling-seedance-comparison/
