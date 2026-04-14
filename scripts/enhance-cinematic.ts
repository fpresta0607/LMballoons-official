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

const CINEMATIC_OUTPAINT_PROMPT = `Extend this photograph into a cinematic 16:9 widescreen composition by outpainting the scene outward on the sides (and top/bottom if needed) to fit a widescreen frame. Preserve every balloon, prop, sign, backdrop, and subject exactly as-is — do not alter, add, remove, recolor, or restyle any balloon or decorative object. Keep the existing subject framing and scale; only reveal more of the surrounding room. Seamlessly continue the existing wall textures, flooring, window view, curtains, and ambient lighting into the newly revealed areas with believable perspective. Match the original color grading, depth of field, and light direction. Editorial photography finish, natural warm lighting, high dynamic range, subtle film grain. No text, logos, watermarks, or extra people.`;

type Job = {
  input: string;
  output: string;
  format: "jpeg" | "png";
};

const JOBS: Job[] = [
  {
    input: "public/images/unused/IMG_0176.jpeg",
    output: "public/images/generated/HappilyEverAfterArch.jpg",
    format: "jpeg",
  },
  {
    input: "public/images/unused/IMG_0623.jpeg",
    output: "public/images/generated/BalletBirthdayTower.jpg",
    format: "jpeg",
  },
  {
    input: "public/images/unused/1C61CD87-4ED7-4BAE-9A4C-85E567FA3B74.jpeg",
    output: "public/images/generated/IlliniWindowColumn.jpg",
    format: "jpeg",
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
          { text: CINEMATIC_OUTPAINT_PROMPT },
        ],
      },
    ],
  });

  const parts = res.candidates?.[0]?.content?.parts ?? [];
  const part = parts.find((p) => p.inlineData);
  if (!part?.inlineData?.data) {
    const textPart = parts.find((p) => p.text)?.text;
    throw new Error(`No image returned for ${job.input}. Response text: ${textPart ?? "(none)"}`);
  }

  const raw = Buffer.from(part.inlineData.data, "base64");

  // Preserve Gemini's full outpainted frame; only downscale if it exceeds 1920 wide.
  // No cover-crop — that would re-crop the very content we just paid to outpaint.
  let pipeline = sharp(raw).resize({ width: 1920, withoutEnlargement: true });
  const buf =
    job.format === "png"
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();

  await writeFile(outPath, buf);
  console.log(`  ✓ ${job.output} (${(buf.byteLength / 1024).toFixed(0)} KB)`);
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
