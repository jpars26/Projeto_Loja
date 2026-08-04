#!/usr/bin/env node
// Redimensiona e comprime fotos em lote, convertendo para .webp no mesmo
// padrão já usado em src/assets/images (ver ImagensVestidos/*).
//
// Uso:
//   node scripts/optimize-images.js <pastaEntrada> <pastaSaida> [--width=1000] [--quality=75]
//
// Formatos aceitos na entrada: jpg, jpeg, png, webp, tiff, avif.
// Fotos em HEIC (padrão do iPhone) precisam ser exportadas como JPEG antes
// (o app Fotos do Windows já faz essa conversão ao importar do iPhone).

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".avif"]);

function parseArgs(argv) {
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const flags = Object.fromEntries(
    argv
      .filter((arg) => arg.startsWith("--"))
      .map((arg) => arg.slice(2).split("="))
  );

  const [inputDir, outputDir] = positional;
  if (!inputDir || !outputDir) {
    console.error(
      "Uso: node scripts/optimize-images.js <pastaEntrada> <pastaSaida> [--width=1000] [--quality=75]"
    );
    process.exit(1);
  }

  return {
    inputDir,
    outputDir,
    width: Number(flags.width ?? 1000),
    quality: Number(flags.quality ?? 75),
  };
}

function listImagesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listImagesRecursively(fullPath);
    }
    return SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

async function optimizeImage({ inputPath, inputDir, outputDir, width, quality }) {
  const relativePath = path.relative(inputDir, inputPath);
  const outputPath = path.join(
    outputDir,
    relativePath.replace(path.extname(relativePath), ".webp")
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  const inputSize = fs.statSync(inputPath).size;
  const outputSize = fs.statSync(outputPath).size;
  return { relativePath, inputSize, outputSize };
}

async function main() {
  const { inputDir, outputDir, width, quality } = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(inputDir)) {
    console.error(`Pasta de entrada não encontrada: ${inputDir}`);
    process.exit(1);
  }

  const images = listImagesRecursively(inputDir);
  if (images.length === 0) {
    console.log("Nenhuma imagem encontrada em", inputDir);
    return;
  }

  console.log(`Processando ${images.length} imagem(ns) — largura máx. ${width}px, qualidade ${quality}...\n`);

  let totalIn = 0;
  let totalOut = 0;

  for (const inputPath of images) {
    const result = await optimizeImage({ inputPath, inputDir, outputDir, width, quality });
    totalIn += result.inputSize;
    totalOut += result.outputSize;
    const reduction = (100 * (1 - result.outputSize / result.inputSize)).toFixed(0);
    console.log(
      `  ${result.relativePath} — ${(result.inputSize / 1024).toFixed(0)}KB → ${(result.outputSize / 1024).toFixed(0)}KB (-${reduction}%)`
    );
  }

  const totalReduction = (100 * (1 - totalOut / totalIn)).toFixed(0);
  console.log(
    `\nConcluído: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB (-${totalReduction}%)`
  );
  console.log(`Saída em: ${outputDir}`);
}

main().catch((error) => {
  console.error("Falhou:", error);
  process.exit(1);
});
