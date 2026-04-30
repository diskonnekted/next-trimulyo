import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  console.log('Final batch image optimization...');

  const imagesToOptimize = [
    { src: 'rt.png', dest: 'rt.webp' },
    { src: 'karangtaruna.jpg', dest: 'karangtaruna.webp' },
    { src: 'posyandu.png', dest: 'posyandu.webp' },
    { src: 'pekerjaan.png', dest: 'pekerjaan.webp' }
  ];

  for (const img of imagesToOptimize) {
    const srcPath = path.join(PUBLIC_IMAGES, img.src);
    const destPath = path.join(PUBLIC_IMAGES, img.dest);

    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${img.src} -> ${img.dest}...`);
      let pipeline = sharp(srcPath);
      await pipeline.webp({ quality: 80 }).toFile(destPath);
      console.log(`Created ${img.dest}`);
    }
  }

  console.log('Final optimization complete!');
}

optimizeImages().catch(console.error);
