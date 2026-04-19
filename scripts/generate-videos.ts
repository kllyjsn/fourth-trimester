/**
 * Generate instructional videos for every exercise in `src/data/exercises.ts`
 * using Google's Veo 3.1 Fast model via the Gemini API.
 *
 * Requires the `GEMINI_API_KEY` environment variable.
 *
 * Usage:
 *   npm run generate-videos
 *
 * Outputs:
 *   public/videos/<exerciseId>.mp4
 */
import { GoogleGenAI } from "@google/genai";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { EXERCISES } from "../src/data/exercises";

const MODEL = process.env.VEO_MODEL ?? "veo-3.1-fast-generate-preview";
const OUT_DIR = path.resolve(process.cwd(), "public/videos");
const POLL_INTERVAL_MS = 10_000;
const MAX_POLL_MINUTES = 10;

const NEGATIVE_PROMPT =
  "text, captions, subtitles, watermarks, logos, baby, infant, stroller, deformed anatomy, extra limbs, extra fingers, equipment, dumbbells, kettlebells, distorted motion, unrealistic physics";

async function fileExists(p: string): Promise<boolean> {
  try {
    const s = await stat(p);
    return s.isFile() && s.size > 0;
  } catch {
    return false;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set. Aborting.");
    process.exit(1);
  }

  const only = process.argv.slice(2);
  const selection = only.length
    ? EXERCISES.filter((e) => only.includes(e.id))
    : EXERCISES;

  if (!selection.length) {
    console.error("No exercises matched the filter.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });

  console.log(
    `Generating ${selection.length} videos with ${MODEL} → ${OUT_DIR}`,
  );

  let done = 0;
  let skipped = 0;
  let failed = 0;

  for (const exercise of selection) {
    const outPath = path.join(OUT_DIR, `${exercise.id}.mp4`);
    const label = `[${exercise.id}]`;

    if (await fileExists(outPath)) {
      console.log(`${label} already exists — skipping`);
      skipped++;
      continue;
    }

    const prompt = exercise.videoPrompt;
    console.log(`${label} starting… (${prompt.length} chars)`);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let operation: any = await ai.models.generateVideos({
        model: MODEL,
        prompt,
        config: {
          aspectRatio: "16:9",
          negativePrompt: NEGATIVE_PROMPT,
          numberOfVideos: 1,
          personGeneration: "allow_all",
          // Silent demonstrations only: avoids Veo's audio safety filter,
          // which was rejecting many breath-cueing prompts with
          // "issue with the audio for your prompt".
          generateAudio: false,
        },
      });

      const started = Date.now();
      while (!operation.done) {
        if (Date.now() - started > MAX_POLL_MINUTES * 60_000) {
          throw new Error(
            `Operation timed out after ${MAX_POLL_MINUTES} minutes`,
          );
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const generated = operation.response?.generatedVideos?.[0]?.video;
      if (!generated) {
        throw new Error(
          `No video in response: ${JSON.stringify(operation.response ?? {}, null, 2).slice(0, 500)}`,
        );
      }

      // Prefer SDK-managed download when available; fall back to inline bytes.
      try {
        await ai.files.download({ file: generated, downloadPath: outPath });
      } catch (err) {
        if (
          generated &&
          (generated as { videoBytes?: string }).videoBytes
        ) {
          const bytes = Buffer.from(
            (generated as { videoBytes: string }).videoBytes,
            "base64",
          );
          await writeFile(outPath, bytes);
        } else {
          throw err;
        }
      }

      if (!(await fileExists(outPath))) {
        throw new Error("Download completed but file is empty or missing");
      }

      done++;
      console.log(`${label} saved → ${outPath}`);
    } catch (err) {
      failed++;
      console.error(`${label} failed:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(
    `\nDone. Generated=${done}  Skipped=${skipped}  Failed=${failed}  Total=${selection.length}`,
  );
  if (failed > 0) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
