const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const LOGO   = path.join(__dirname, 'barracudas3/assets/logo.png');
const OUTDIR = path.join(__dirname, 'barracudas3/assets/icons');
const BG     = { r: 13, g: 31, b: 15, alpha: 1 }; // #0d1f0f

const SIZES = [
  { name: 'icon-512x512.png', size: 512 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-180x180.png', size: 180 }, // Apple Touch Icon
  { name: 'icon-152x152.png', size: 152 }, // iPad
  { name: 'icon-120x120.png', size: 120 }, // iPhone
];

async function generate() {
  fs.mkdirSync(OUTDIR, { recursive: true });

  for (const { name, size } of SIZES) {
    const padding  = Math.round(size * 0.15);          // 15% padding each side
    const logoSize = size - padding * 2;               // logo fills 70%

    // 1. Resize logo with its alpha channel preserved
    const logoBuffer = await sharp(LOGO)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    // 2. Compose: dark green background + centred logo
    const outPath = path.join(OUTDIR, name);
    await sharp({
      create: {
        width:      size,
        height:     size,
        channels:   4,
        background: BG,
      },
    })
    .composite([{
      input:     logoBuffer,
      gravity:   'center',
    }])
    .png()
    .toFile(outPath);

    console.log(`✓ ${name}  (${size}×${size})`);
  }

  console.log(`\nIcons written to barracudas3/assets/icons/`);
}

generate().catch(err => { console.error(err); process.exit(1); });
