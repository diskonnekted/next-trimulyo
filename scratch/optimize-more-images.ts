import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  console.log('Starting extended batch image optimization...');

  const imagesToOptimize = [
    { src: 'bpkal.png', dest: 'bpkal.webp' },
    { src: 'lpmk.png', dest: 'lpmk.webp' },
    { src: 'pdf-cover.png', dest: 'pdf-cover.webp' },
    { src: 'home-desktop.png', dest: 'home-desktop.webp' },
    { src: 'home-mobile.png.png', dest: 'home-mobile.webp' }, // Fixed typo in source filename if it exists
    { src: 'struktur.jpg', dest: 'struktur.webp' },
    { src: 'balong-mantaran.jpg', dest: 'balong-mantaran.webp' },
    { src: 'blunyah.jpg', dest: 'blunyah.webp' },
    { src: 'jogokerten.jpg', dest: 'jogokerten.webp' },
    { src: 'klegen polowidi.jpg', dest: 'klegen-polowidi.webp' }
  ];

  for (const img of imagesToOptimize) {
    const srcPath = path.join(PUBLIC_IMAGES, img.src);
    const destPath = path.join(PUBLIC_IMAGES, img.dest);

    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${img.src} -> ${img.dest}...`);
      let pipeline = sharp(srcPath);
      
      const options = { quality: 80 };
      
      await pipeline.webp(options).toFile(destPath);
      console.log(`Created ${img.dest}`);
    } else {
      console.warn(`Source file not found: ${srcPath}`);
    }
  }

  console.log('Extended optimization complete!');
}

optimizeImages().catch(console.error);
