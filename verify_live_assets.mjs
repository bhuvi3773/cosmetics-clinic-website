import fs from 'fs';

const BASE = 'https://bhuvi3773.github.io/cosmetics-clinic-website/';

const distHtml = fs.readFileSync('dist/index.html', 'utf8');
const jsMatch = distHtml.match(/src=["']\.\/assets\/(.+?)["']/);
const cssMatch = distHtml.match(/href=["']\.\/assets\/(.+?)["']/);

const urls = [
  BASE,
  `${BASE}assets/${jsMatch ? jsMatch[1] : ''}`,
  `${BASE}assets/${cssMatch ? cssMatch[1] : ''}`,
  `${BASE}images/clinic-treatment-suite.jpg`,
  `${BASE}images/clinic-architecture.jpg`,
  `${BASE}images/practitioner-portrait.jpg`,
  `${BASE}images/treatment-hydration.jpg`,
  `${BASE}images/treatment-dermal-peel.jpg`,
  `${BASE}images/treatment-collagen-facial.jpg`,
  `${BASE}images/treatment-clarifying-protocol.jpg`,
  `${BASE}images/treatment-barrier-recovery.jpg`,
  `${BASE}images/treatment-skin-assessment.jpg`
];

async function verifyAll() {
  console.log('--- Verifying Live Cosmetics Clinic Website on GitHub Pages ---');
  let allOk = true;
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type');
      const contentLength = res.headers.get('content-length');
      console.log(`[${res.status} ${res.statusText}] ${url}`);
      console.log(`  -> Type: ${contentType}, Size: ${contentLength} bytes`);
      if (res.status !== 200) {
        allOk = false;
      }
    } catch (err) {
      console.error(`FAILED: ${url}`, err.message);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\nSUCCESS: All production assets are serving live with 200 OK!');
  } else {
    console.log('\nWARNING: Some assets did not return 200 OK.');
  }
}

verifyAll();
