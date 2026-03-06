import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = './Mango juice';
const outDir = './public/images/mango';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Ensure proper sorting like ezgif-frame-001.jpg
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg')).sort();

(async () => {
    for (let i = 0; i < 120 && i < files.length; i++) {
        const file = files[i];
        await sharp(path.join(srcDir, file))
            .webp()
            .toFile(path.join(outDir, `${i + 1}.webp`));
    }
    console.log('Conversion complete');
})();
