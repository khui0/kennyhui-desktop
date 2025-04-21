import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const base = "src/icons";

const inputDir = path.join(base, "source");
const outputDir = path.join("src/lib/assets/icons");
const maskPath = path.join(base, "mask.svg");

async function process() {
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(inputDir);

  for (const file of files) {
    generateIcon(inputDir, outputDir, file);
  }
}

async function generateIcon(input: string, output: string, file: string) {
  const parsed = path.parse(file);
  const name = `${parsed.name}${parsed.ext}`;

  const inputPath = path.join(input, file);
  const outputPath = path.join(output, name);

  const masked = await sharp(inputPath)
    .composite([{ input: maskPath, blend: "dest-in", top: 0, left: 0 }])
    .toBuffer();
  await sharp(masked).resize(1024).toFormat("png").toFile(outputPath);

  console.log(`Generated ${outputPath}`);
}

process();
