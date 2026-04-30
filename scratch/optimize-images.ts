import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  console.log('Starting batch image optimization...');

  const imagesToOptimize = [
    { src: 'logo.png', dest: 'logo.webp', resize: 140 },
    { src: 'idm/logo.png', dest: 'idm/logo.webp', resize: 256 },
    { src: 'sdgs/logo.png', dest: 'sdgs/logo.webp', resize: 256 },
    { src: 'hero.jpg', dest: 'hero.webp', quality: 75 }
  ];

  for (const img of imagesToOptimize) {
    const srcPath = path.join(PUBLIC_IMAGES, img.src);
    const destPath = path.join(PUBLIC_IMAGES, img.dest);

    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${img.src} -> ${img.dest}...`);
      let pipeline = sharp(srcPath);
      
      if (img.resize) {
        pipeline = pipeline.resize(img.resize);
      }
      
      const options = img.dest.endsWith('.webp') ? { quality: img.quality || 85 } : {};
      
      await pipeline.webp(options).toFile(destPath);
      console.log(`Created ${img.dest}`);
    } else {
      console.warn(`Source file not found: ${srcPath}`);
    }
  }

  console.log('Batch optimization complete!');
}

optimizeImages().catch(console.error);
