import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const TARGET_URL = 'http://localhost:4173/';

console.log('--- Launching Chrome for Interactive CDP Verification ---');

const chromeProc = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' });

// Ensure Chrome process cleanup
const cleanup = () => {
  try {
    chromeProc.kill('SIGKILL');
  } catch {}
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(1); });

// Helper to poll for Chrome debugging endpoint
async function waitForChrome(maxRetries = 20) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('Chrome did not respond on debugging port');
}

await waitForChrome();
console.log('✓ Chrome headless initialized');

// Create a new target page
const newPageRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(TARGET_URL)}`, { method: 'PUT' });
const pageData = await newPageRes.json();
const wsUrl = pageData.webSocketDebuggerUrl;

console.log('✓ Page opened, connecting to CDP WebSocket');

const ws = new WebSocket(wsUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

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

// Enable Page and Runtime
await send('Page.enable');
await send('Runtime.enable');
await send('DOM.enable');

// Navigate explicitly and wait for load
await send('Page.navigate', { url: TARGET_URL });
await new Promise(r => setTimeout(r, 2000));

// Clear localStorage for a clean first-time visitor baseline
await evalJs(`localStorage.clear()`);
await send('Page.reload');
await new Promise(r => setTimeout(r, 1200));

async function evalJs(expr) {

  const res = await send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(`JS Eval failed: ${JSON.stringify(res.exceptionDetails)}`);
  }
  return res.result.value;
}

console.log('--- 1. Testing Default Language & Document Metadata ---');
const initialLang = await evalJs(`document.documentElement.lang`);
console.log(`Document lang: "${initialLang}" (expected: "en")`);
if (initialLang !== 'en') throw new Error(`Initial lang expected 'en', got '${initialLang}'`);

const initialHeroTitle = await evalJs(`document.getElementById('hero-title')?.innerText`);
console.log(`Initial Hero Title: "${initialHeroTitle?.replace(/\n/g, ' ')}"`);
if (!initialHeroTitle.includes('Personalized Aesthetic Care')) {
  throw new Error('Hero title did not match English translation');
}
console.log('✓ Default English state verified');

console.log('\n--- 2. Testing Viewport Responsiveness & Layout Overflow ---');
const viewports = [
  { width: 320, height: 600, label: 'Small Mobile (320px)' },
  { width: 375, height: 667, label: 'Standard Mobile (375px)' },
  { width: 430, height: 932, label: 'Large Mobile (430px)' },
  { width: 768, height: 1024, label: 'Tablet (768px)' },
  { width: 1024, height: 768, label: 'Small Desktop (1024px)' },
  { width: 1440, height: 900, label: 'Large Desktop (1440px)' },
];

for (const vp of viewports) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.width < 960,
  });
  await new Promise(r => setTimeout(r, 200));

  const overflow = await evalJs(`({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    brandVisible: !!document.querySelector('.brand-name'),
    navVisible: !!document.querySelector('.navbar-header')
  })`);

  console.log(`Viewport ${vp.label}: scrollWidth=${overflow.scrollWidth}px, innerWidth=${overflow.innerWidth}px, hasOverflow=${overflow.hasOverflow}`);
  if (overflow.hasOverflow) {
    const offending = await evalJs(`
      Array.from(document.querySelectorAll('*'))
        .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
        .map(el => ({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          right: Math.round(el.getBoundingClientRect().right),
          width: Math.round(el.getBoundingClientRect().width)
        }))
        .slice(0, 10)
    `);
    console.log('Offending elements:', JSON.stringify(offending, null, 2));
    throw new Error(`Horizontal layout overflow detected at ${vp.label}! scrollWidth: ${overflow.scrollWidth} > innerWidth: ${overflow.innerWidth}`);
  }

}
console.log('✓ All 6 viewport widths verified: ZERO horizontal overflow');

// Reset to desktop viewport for interactive checks
await send('Emulation.setDeviceMetricsOverride', {
  width: 1280,
  height: 800,
  deviceScaleFactor: 1,
  mobile: false,
});

console.log('\n--- 3. Testing Real-Time Language Switching (English -> Telugu -> Hindi) ---');

// Switch to Telugu
console.log('Switching to Telugu (te)...');
await evalJs(`(() => {
  const teBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.includes('TE') || b.textContent.includes('తెలుగు'));
  if (teBtn) teBtn.click();
  else throw new Error('Telugu button not found');
})()`);

await new Promise(r => setTimeout(r, 300));

const teState = await evalJs(`({
  htmlLang: document.documentElement.lang,
  heroTitle: document.getElementById('hero-title')?.innerText,
  storedLang: localStorage.getItem('clinic_language'),
  enquireBtn: document.querySelector('.nav-cta-btn')?.innerText?.trim()
})`);

console.log(`Telugu switch result: htmlLang="${teState.htmlLang}", stored="${teState.storedLang}", CTA="${teState.enquireBtn}"`);
console.log(`Telugu Hero: "${teState.heroTitle?.replace(/\n/g, ' ')}"`);

if (teState.htmlLang !== 'te') throw new Error(`HTML lang expected 'te', got '${teState.htmlLang}'`);
if (teState.storedLang !== 'te') throw new Error(`localStorage expected 'te', got '${teState.storedLang}'`);
if (!teState.heroTitle.includes('వ్యక్తిగతీకరించిన')) throw new Error('Telugu hero title mismatch');
console.log('✓ Instant Telugu language update verified');

// Switch to Hindi
console.log('Switching to Hindi (hi)...');
await evalJs(`(() => {
  const hiBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.includes('HI') || b.textContent.includes('हिन्दी'));
  if (hiBtn) hiBtn.click();
  else throw new Error('Hindi button not found');
})()`);

await new Promise(r => setTimeout(r, 300));

const hiState = await evalJs(`({
  htmlLang: document.documentElement.lang,
  heroTitle: document.getElementById('hero-title')?.innerText,
  storedLang: localStorage.getItem('clinic_language'),
  enquireBtn: document.querySelector('.nav-cta-btn')?.innerText?.trim()
})`);

console.log(`Hindi switch result: htmlLang="${hiState.htmlLang}", stored="${hiState.storedLang}", CTA="${hiState.enquireBtn}"`);
console.log(`Hindi Hero: "${hiState.heroTitle?.replace(/\n/g, ' ')}"`);

if (hiState.htmlLang !== 'hi') throw new Error(`HTML lang expected 'hi', got '${hiState.htmlLang}'`);
if (hiState.storedLang !== 'hi') throw new Error(`localStorage expected 'hi', got '${hiState.storedLang}'`);
if (!hiState.heroTitle.includes('व्यक्तिगत')) throw new Error('Hindi hero title mismatch');
console.log('✓ Instant Hindi language update verified');

console.log('\n--- 4. Testing Language Persistence on Page Reload ---');
await send('Page.reload');
await new Promise(r => setTimeout(r, 1200));

const reloadedState = await evalJs(`({
  htmlLang: document.documentElement.lang,
  storedLang: localStorage.getItem('clinic_language'),
  heroTitle: document.getElementById('hero-title')?.innerText
})`);

console.log(`Reloaded state: htmlLang="${reloadedState.htmlLang}", stored="${reloadedState.storedLang}"`);
if (reloadedState.htmlLang !== 'hi') throw new Error(`Language did not persist across reload! Got '${reloadedState.htmlLang}'`);
console.log('✓ Language persistence verified across reload');

console.log('\n--- 5. Testing Interactive WhatsApp Modal in Selected Language ---');
// Click Hero CTA button
await evalJs(`document.querySelector('.hero-primary-btn')?.click()`);
await new Promise(r => setTimeout(r, 300));

const modalStatus = await evalJs(`({
  isOpen: !!document.querySelector('.modal-dialog'),
  title: document.getElementById('modal-title')?.innerText,
  previewText: document.querySelector('.preview-text')?.innerText,
  dismissBtnText: document.querySelector('.modal-cancel-btn')?.innerText
})`);

console.log('Modal status:', modalStatus);
if (!modalStatus.isOpen) throw new Error('Modal did not open on CTA click');
if (!modalStatus.title.includes('व्हाट्सएप') && !modalStatus.title.includes('WhatsApp')) {
  throw new Error('Modal title was not properly localized');
}

// Click dismiss to close
await evalJs(`document.querySelector('.modal-close-btn')?.click()`);
await new Promise(r => setTimeout(r, 200));
const isClosed = await evalJs(`!document.querySelector('.modal-dialog')`);
if (!isClosed) throw new Error('Modal did not close on dismiss');
console.log('✓ WhatsApp Placeholder Modal opens with localized content and dismisses correctly');

console.log('\n--- 6. Testing Contact Form & WhatsApp Prefilled Message Generator ---');
await evalJs(`(() => {
  function setReactInputValue(el, value) {
    const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, 'value');
    desc.set.call(el, value);
    if (el._valueTracker) {
      el._valueTracker.setValue('');
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const nameInput = document.getElementById('form-name');
  setReactInputValue(nameInput, 'Eleanor Vance');

  const notesInput = document.getElementById('form-notes');
  if (notesInput) {
    setReactInputValue(notesInput, 'Skin sensitivity assessment.');
  }

  const form = document.querySelector('.enquiry-form');
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
})()`);



await new Promise(r => setTimeout(r, 400));

const formModalStatus = await evalJs(`({
  isOpen: !!document.querySelector('.modal-dialog'),
  previewText: document.querySelector('.preview-text')?.innerText
})`);

console.log('Contact form submission modal status:', formModalStatus);
if (!formModalStatus.isOpen) throw new Error('Modal did not open after form submission');
if (!formModalStatus.previewText.includes('Eleanor Vance') || !formModalStatus.previewText.includes('Skin sensitivity assessment.')) {
  throw new Error('Form details (name / notes) were not preserved in generated WhatsApp message');
}
console.log('✓ Contact form generated localized WhatsApp message with intact patient details');

// Close modal and switch back to English default
await evalJs(`document.querySelector('.modal-close-btn')?.click()`);
await evalJs(`(() => {
  const enBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.includes('EN') || b.textContent.includes('English'));
  if (enBtn) enBtn.click();
})()`);
await new Promise(r => setTimeout(r, 200));

console.log('\n--- 7. Testing Mobile Navigation Drawer Interaction ---');
// Emulate mobile
await send('Emulation.setDeviceMetricsOverride', {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  mobile: true,
});
await new Promise(r => setTimeout(r, 200));

// Click hamburger
await evalJs(`document.querySelector('.hamburger-btn')?.click()`);
await new Promise(r => setTimeout(r, 350));

const drawerState = await evalJs(`({
  isOpen: document.getElementById('mobile-navigation')?.classList.contains('is-open'),
  hasDrawerLangSelector: !!document.querySelector('.mobile-drawer .lang-selector-drawer'),
  navItemsCount: document.querySelectorAll('.mobile-nav-link').length
})`);

console.log('Drawer State on Mobile:', drawerState);
if (!drawerState.isOpen) throw new Error('Mobile drawer did not open');
if (!drawerState.hasDrawerLangSelector) throw new Error('Mobile drawer does not contain language selector');
if (drawerState.navItemsCount < 5) throw new Error('Mobile navigation links missing');

// Close drawer via close button
await evalJs(`document.querySelector('.drawer-close-btn')?.click()`);
await new Promise(r => setTimeout(r, 350));
const drawerClosed = await evalJs(`!document.getElementById('mobile-navigation')?.classList.contains('is-open')`);
if (!drawerClosed) throw new Error('Mobile drawer did not close');
console.log('✓ Mobile navigation drawer opening, closing, and language selection verified');

console.log('\n======================================================');
console.log('🎉 ALL BROWSER & INTERACTIVE TESTS PASSED PERFECTLY! 🎉');
console.log('======================================================');

ws.close();
cleanup();
process.exit(0);
