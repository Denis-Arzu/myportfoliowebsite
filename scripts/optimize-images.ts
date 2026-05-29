#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Converts PNG/JPEG images to WebP format with aggressive compression
 * for optimal loading performance.
 *
 * Usage:
 *   npx ts-node scripts/optimize-images.ts
 *   or
 *   node --loader ts-node/esm scripts/optimize-images.ts
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

interface OptimizationConfig {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

const OPTIMIZATION_CONFIGS: Record<string, OptimizationConfig> = {
  // Logos and icons
  "dentrixappslogoicon.png": { quality: 60, maxWidth: 128, maxHeight: 128 },
  "icon.png": { quality: 60, maxWidth: 180, maxHeight: 180 },
  "dentrixappslg.png": { quality: 70, maxWidth: 400, maxHeight: 120 },
  // OG image
  "og-image.png": { quality: 75, maxWidth: 1200, maxHeight: 630 },
  // Profile photo (removed — no longer rendered)
};

async function optimizeImage(
  inputPath: string,
  outputPath: string,
  config: OptimizationConfig,
): Promise<void> {
  let pipeline = sharp(inputPath);

  // Get metadata
  const metadata = await pipeline.metadata();

  // Resize if needed
  if (config.maxWidth || config.maxHeight) {
    pipeline = pipeline.resize({
      width: config.maxWidth,
      height: config.maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Convert to WebP with specified quality
  pipeline = pipeline.webp({
    quality: config.quality,
    effort: 6, // High compression effort (0-6)
  });

  await pipeline.toFile(outputPath);
}

async function optimizeDirectory(dirPath: string): Promise<void> {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await optimizeDirectory(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) {
      continue;
    }

    const config = OPTIMIZATION_CONFIGS[entry.name] || { quality: 75 };
    const outputPath = fullPath.replace(ext, ".webp");

    try {
      const beforeStats = fs.statSync(fullPath);
      await optimizeImage(fullPath, outputPath, config);
      const afterStats = fs.statSync(outputPath);

      const savings = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(
        1,
      );
      console.log(
        `✓ ${entry.name}: ${(beforeStats.size / 1024).toFixed(1)}KB → ${(afterStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`,
      );
    } catch (error) {
      console.error(`✗ Failed to optimize ${entry.name}:`, error);
    }
  }
}

async function main(): Promise<void> {
  console.log("🖼️  Starting image optimization...\n");

  if (!fs.existsSync(IMAGES_DIR)) {
    console.log("No images directory found");
    return;
  }

  await optimizeDirectory(IMAGES_DIR);

  // Also optimize root level images (icon.png)
  const rootImages = ["icon.png"];
  for (const imgName of rootImages) {
    const imgPath = path.join(PUBLIC_DIR, imgName);
    if (!fs.existsSync(imgPath)) continue;

    const config = OPTIMIZATION_CONFIGS[imgName] || { quality: 75 };
    const outputPath = imgPath.replace(".png", ".webp");

    try {
      const beforeStats = fs.statSync(imgPath);
      await optimizeImage(imgPath, outputPath, config);
      const afterStats = fs.statSync(outputPath);

      const savings = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(
        1,
      );
      console.log(
        `✓ ${imgName}: ${(beforeStats.size / 1024).toFixed(1)}KB → ${(afterStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`,
      );
    } catch (error) {
      console.error(`✗ Failed to optimize ${imgName}:`, error);
    }
  }

  console.log("\n✅ Image optimization complete!");
  console.log("\nNext steps:");
  console.log(
    "1. Update image references in components to use .webp extension",
  );
  console.log("2. Update next.config.ts to enable image optimization");
  console.log("3. Use next/image component for automatic optimization");
}

main().catch(console.error);
