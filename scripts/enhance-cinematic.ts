import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: resolve(process.cwd(), ".env.local") });

const apiKey = (
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_AI_API_KEY ??
  ""
).trim().replace(/\/+$/, "");

if (!apiKey) {
  throw new Error("Missing Gemini API key (GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_AI_API_KEY)");
}

const ai = new GoogleGenAI({ apiKey });

const CINEMATIC_OUTPAINT_PROMPT = `OUTPAINT this photo to a cinematic widescreen frame. The ORIGINAL photograph must appear INSIDE the result at 100% of its pixels, uncropped and unscaled in the middle of the canvas. Do NOT crop, zoom, re-center, re-frame, recolor, relight, or modify ANY part of the original image. Every balloon, prop, neon sign, backdrop panel, curtain, window, floor, and subject stays pixel-perfect identical. ONLY generate NEW content in the blank canvas area to the LEFT and RIGHT (and if needed, above and below) of the original photo, by seamlessly continuing the existing room: same wall color and texture, same flooring, same window view, same drapery, same ambient lighting and color temperature, correct vanishing-point perspective. The newly painted side panels should contain NO new balloons, NO new people, NO text, NO signage, NO logos — only plausible empty room continuation (more wall, more floor, more window, more ceiling). Editorial photography finish, natural warm lighting, matching color grade.`;

type Job = {
  input: string;
  output: string;
  aspectRatio: "16:9" | "4:3" | "3:2";
};

const JOBS: Job[] = [
  {
    input: "public/images/unused/IMG_0176.jpeg",
    output: "public/images/generated/HappilyEverAfterArch.jpg",
    aspectRatio: "16:9",
  },
  {
    input: "public/images/unused/IMG_0623.jpeg",
    output: "public/images/generated/BalletBirthdayTower.jpg",
    aspectRatio: "16:9",
  },
  {
    input: "public/images/unused/1C61CD87-4ED7-4BAE-9A4C-85E567FA3B74.jpeg",
    output: "public/images/generated/IlliniWindowColumn.jpg",
    aspectRatio: "16:9",
  },
];

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);

async function runJob(job: Job) {
  const inPath = resolve(process.cwd(), job.input);
  const outPath = resolve(process.cwd(), job.output);

  console.log(`\n→ ${job.input}`);
  const sourceBytes = await readFile(inPath);
  const normalizedSource = await sharp(sourceBytes)
    .rotate()
    .jpeg({ quality: 92 })
    .toBuffer();
  const sourceBase64 = normalizedSource.toString("base64");

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { data: sourceBase64, mimeType: "image/jpeg" } },
          { text: `${CINEMATIC_OUTPAINT_PROMPT}\n\nTarget output aspect ratio: ${job.aspectRatio}.` },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: job.aspectRatio },
    },
  });

  const parts = res.candidates?.[0]?.content?.parts ?? [];
  const part = parts.find((p) => p.inlineData);
  if (!part?.inlineData?.data) {
    const textPart = parts.find((p) => p.text)?.text;
    throw new Error(`No image returned for ${job.input}. Response text: ${textPart ?? "(none)"}`);
  }

  const raw = Buffer.from(part.inlineData.data, "base64");
  const meta = await sharp(raw).metadata();
  // Save Gemini's output as-is — NO resize, NO crop. Only re-encode to JPEG for file-size.
  const buf = await sharp(raw).jpeg({ quality: 90, mozjpeg: true }).toBuffer();

  await writeFile(outPath, buf);
  console.log(`  ✓ ${job.output} ${meta.width}x${meta.height} (${(buf.byteLength / 1024).toFixed(0)} KB)`);
}

async function main() {
  const jobs = onlyArg
    ? JOBS.filter((j) => j.input.includes(onlyArg) || j.output.includes(onlyArg))
    : JOBS;

  if (jobs.length === 0) {
    console.error(`No jobs matched --only=${onlyArg}`);
    process.exit(1);
  }

  for (const job of jobs) {
    try {
      await runJob(job);
    } catch (err) {
      console.error(`  ✗ ${job.input} failed:`, err instanceof Error ? err.message : err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
