import path from "path";
import fs from "fs";

import sharp from "sharp";

const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-144x144.png", size: 96 },
    { name: "favicon-144x144.png", size: 144 },
    { name: "favicon-192x192.png", size: 192 },
    { name: "favicon-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
];

const publicDir = path.join(process.cwd(), "public");
const svgPath = path.join(publicDir, "icon.svg");

async function generateIcons() {
    try {
        // Check if SVG exists
        if (!fs.existsSync(svgPath)) {
            process.exit(1);
        }

        // Generate PNG files
        for (const { name, size } of sizes) {
            const outputPath = path.join(publicDir, name);

            await sharp(svgPath).resize(size, size).png({ quality: 90 }).toFile(outputPath);
        }

        // Generate favicon.ico (multiple sizes in one file)
        const faviconSizes = [16, 32, 48];
        const faviconBuffers = await Promise.all(
            faviconSizes.map((size) => sharp(svgPath).resize(size, size).png().toBuffer())
        );

        // Combine into ICO file
        const icoPath = path.join(publicDir, "favicon.ico");

        await sharp(faviconBuffers[0]) // Use 32x32 as base
            .toFile(icoPath);
    } catch {
        process.exit(1);
    }
}

generateIcons();
