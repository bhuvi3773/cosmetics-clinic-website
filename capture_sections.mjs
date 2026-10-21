import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9224;
const TARGET_URL = 'http://localhost:4173/';

const chromeProc = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' });

const cleanup = () => { try { chromeProc.kill('SIGKILL'); } catch {} };
process.on('exit', cleanup);

for (let i = 0; i < 20; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    if (res.ok) break;
  } catch {}
  await new Promise(r => setTimeout(r, 200));
}

const newPageRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(TARGET_URL)}`, { method: 'PUT' });
const pageData = await newPageRes.json();
const ws = new WebSocket(pageData.webSocketDebuggerUrl);

await new Promise((resolve) => { ws.onopen = resolve; });

let msgId = 1;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(msg.error);
    else resolve(msg.result);
  }
};

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: TARGET_URL });
await new Promise(r => setTimeout(r, 3000));

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

async function captureElement(selector, filename) {
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('${selector}');
      if (!el) return null;
      el.scrollIntoView({ block: 'start' });
      const rect = el.getBoundingClientRect();
      return { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
    })()`,
    returnByValue: true,
  });

  await new Promise(r => setTimeout(r, 600));

  if (res.result && res.result.value) {
    const clip = res.result.value;
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: clip.x, y: clip.y, width: clip.width, height: Math.min(clip.height, 1200), scale: 1 },
      captureBeyondViewport: true
    });
    fs.writeFileSync(path.join(__dirname, filename), Buffer.from(shot.data, 'base64'));
    console.log(`✓ Saved ${filename}`);
  } else {
    console.log(`✗ Selector not found: ${selector}`);
  }
}

await captureElement('#treatments', 'section_treatments.png');
await captureElement('#packages', 'section_packages.png');
await captureElement('#about', 'section_about.png');
await captureElement('#practitioner', 'section_practitioner.png');
await captureElement('#gallery', 'section_gallery.png');
await captureElement('#reviews', 'section_reviews.png');
await captureElement('#faqs', 'section_faqs.png');
await captureElement('.site-footer', 'section_footer.png');

ws.close();
cleanup();
process.exit(0);
