#!/usr/bin/env node
import path from "path";
import sharp from "sharp";

const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-96x96.png", size: 96 },
    { name: "favicon-144x144.png", size: 144 },
    { name: "favicon-192x192.png", size: 192 },
    { name: "favicon-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
];

const publicDir = path.join(process.cwd(), "public");
const logoPath = path.join(publicDir, "images/logo.png");

async function generateFavicons() {
    try {
        console.log("Generating favicons from:", logoPath);

        // Generate PNG files
        for (const { name, size } of sizes) {
            const outputPath = path.join(publicDir, name);
            await sharp(logoPath)
                .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png({ quality: 90 })
                .toFile(outputPath);
            console.log(`Generated: ${name} (${size}x${size})`);
        }

        // Generate favicon.ico
        const faviconSizes = [16, 32, 48];
        const faviconBuffers = await Promise.all(
            faviconSizes.map((size) =>
                sharp(logoPath)
                    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
                    .png()
                    .toBuffer()
            )
        );

        const icoPath = path.join(publicDir, "favicon.ico");
        await sharp(faviconBuffers[1]) // Use 32x32 as base
            .toFile(icoPath);
        console.log("Generated: favicon.ico");

        console.log("\nAll favicon files generated successfully!");
    } catch (error) {
        console.error("Error generating favicons:", error);
        process.exit(1);
    }
}

generateFavicons();
