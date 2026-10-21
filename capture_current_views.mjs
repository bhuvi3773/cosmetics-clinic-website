import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9223;
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
await send('Page.navigate', { url: TARGET_URL });
await new Promise(r => setTimeout(r, 1500));

// Capture Desktop
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await new Promise(r => setTimeout(r, 500));
const deskShot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(__dirname, 'current_desktop.png'), Buffer.from(deskShot.data, 'base64'));
console.log('✓ Captured current_desktop.png');

// Capture Mobile
await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
await new Promise(r => setTimeout(r, 500));
const mobShot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(__dirname, 'current_mobile.png'), Buffer.from(mobShot.data, 'base64'));
console.log('✓ Captured current_mobile.png');

ws.close();
cleanup();
process.exit(0);
