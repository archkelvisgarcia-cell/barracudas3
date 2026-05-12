const sharp = require('sharp');
const path  = require('path');

const LOGO  = path.join(__dirname, 'barracudas3/assets/logo.png');
const OUT   = path.join(__dirname, 'barracudas3/assets/og-image.jpg');
const W = 1200, H = 630;

async function generate() {
  // Resize logo to fit the left half with padding
  const logoSize = 300;
  const logoBuf = await sharp(LOGO)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // SVG overlay: logo region tint + right-side text
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <!-- subtle left-panel lighter bg -->
    <rect x="0" y="0" width="500" height="${H}" fill="rgba(255,255,255,0.03)" rx="0"/>
    <!-- vertical divider -->
    <line x1="500" y1="60" x2="500" y2="${H-60}" stroke="rgba(240,180,41,0.25)" stroke-width="1"/>
    <!-- right: club name -->
    <text x="540" y="220"
      font-family="Impact, Arial Black, sans-serif"
      font-size="80" font-weight="900"
      letter-spacing="-2"
      fill="#ffffff">ZÜRICH</text>
    <text x="540" y="310"
      font-family="Impact, Arial Black, sans-serif"
      font-size="80" font-weight="900"
      letter-spacing="-2"
      fill="#f0b429">BARRACUDAS</text>
    <!-- divider line under title -->
    <line x1="540" y1="335" x2="1150" y2="335" stroke="rgba(240,180,41,0.4)" stroke-width="2"/>
    <!-- tagline -->
    <text x="540" y="385"
      font-family="Arial, sans-serif"
      font-size="26"
      letter-spacing="1"
      fill="rgba(255,255,255,0.65)">Defending Gruppe A Champions · 2026</text>
    <!-- founded line -->
    <text x="540" y="430"
      font-family="Arial, sans-serif"
      font-size="20"
      fill="rgba(255,255,255,0.35)">Founded 1986 · Heerenschürli, Zürich</text>
    <!-- NL badge -->
    <rect x="540" y="470" width="200" height="40" rx="4" fill="rgba(240,180,41,0.15)" stroke="#f0b429" stroke-width="1"/>
    <text x="640" y="496"
      font-family="Arial, sans-serif"
      font-size="16" font-weight="700"
      letter-spacing="2"
      text-anchor="middle"
      fill="#f0b429">NL BASEBALL</text>
  </svg>`;

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 13, g: 31, b: 15, alpha: 1 } },
  })
  .composite([
    // logo centred in left half (x≈100, y≈165)
    { input: logoBuf, left: Math.round((500 - logoSize) / 2), top: Math.round((H - logoSize) / 2) },
    // SVG text overlay
    { input: Buffer.from(svg), gravity: 'northwest' },
  ])
  .jpeg({ quality: 92 })
  .toFile(OUT);

  console.log(`✓ og-image.jpg  (${W}×${H})  →  barracudas3/assets/og-image.jpg`);
}

generate().catch(err => { console.error(err); process.exit(1); });
