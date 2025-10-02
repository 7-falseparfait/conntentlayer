const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configuration
const config = {
  quality: 80,
  inputFormats: [".png", ".jpg", ".jpeg", ".tiff", ".bmp"],
  inputDir: "./public/",
  outputDir: "./webp",
  overwrite: false,
};

function getImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Input directory doesn't exist: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  return files.filter((file) =>
    config.inputFormats.includes(path.extname(file).toLowerCase())
  );
}

async function convertToWebP(inputPath, outputPath, quality) {
  try {
    await sharp(inputPath).webp({ quality: quality }).toFile(outputPath);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to convert: ${path.basename(inputPath)}`,
      error.message
    );
    return false;
  }
}

// Main function
async function main() {
  console.log("🔄 Starting WebP conversion...\n");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  const imageFiles = getImageFiles(config.inputDir);

  if (imageFiles.length === 0) {
    console.log("❌ No image files found in the input directory");
    return;
  }

  console.log(`📁 Found ${imageFiles.length} images to convert:\n`);

  let successCount = 0;
  let skipCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(config.inputDir, file);
    const outputFileName = path.basename(file, path.extname(file)) + ".webp";
    const outputPath = path.join(config.outputDir, outputFileName);

    // Check if output already exists
    if (!config.overwrite && fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped: ${file} (already exists)`);
      skipCount++;
      continue;
    }

    process.stdout.write(`🔄 Converting: ${file}... `);

    const success = await convertToWebP(inputPath, outputPath, config.quality);

    if (success) {
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ Done (${savings}% smaller)`);
      successCount++;
    } else {
      console.log("❌ Failed");
    }
  }

  console.log("\n📊 Conversion Summary:");
  console.log(`✅ Successful: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`📁 Output directory: ${config.outputDir}`);
}

try {
  require("sharp");
  main().catch(console.error);
} catch (error) {
  console.log("📦 Installing Sharp dependency...");
  const { execSync } = require("child_process");
  try {
    execSync("npm install sharp", { stdio: "inherit" });
    console.log("✅ Sharp installed successfully! Running conversion...");
    main().catch(console.error);
  } catch (installError) {
    console.error("❌ Failed to install Sharp. Please run: npm install sharp");
  }
}
