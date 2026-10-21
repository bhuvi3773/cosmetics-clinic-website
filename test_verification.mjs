import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting Cosmetics Clinic Website Verification ---');

// 1. Verify clinicData.js content and image existence
const clinicDataPath = path.join(__dirname, 'src', 'data', 'clinicData.js');
if (!fs.existsSync(clinicDataPath)) {
  console.error('FAIL: clinicData.js not found!');
  process.exit(1);
}

const clinicDataModule = await import('./src/data/clinicData.js');
const { clinicConfig, getWhatsAppAction } = clinicDataModule;

console.log('✓ clinicData.js loaded successfully');
console.log(`  Clinic Name: ${clinicConfig.brand.name}`);
console.log(`  Tagline: ${clinicConfig.brand.tagline}`);

// Check all image references
const checkImage = (relPath, label) => {
  if (!relPath) {
    console.error(`FAIL: Missing image path for ${label}`);
    return false;
  }
  const cleanPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  const fullPath = path.join(__dirname, 'public', cleanPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`FAIL: Image not found on disk: ${fullPath} (${label})`);
    return false;
  }
  const stats = fs.statSync(fullPath);
  console.log(`✓ Image verified: ${cleanPath} (${(stats.size / 1024).toFixed(1)} KB) - ${label}`);
  return true;
};

let allImagesOk = true;
allImagesOk &&= checkImage(clinicConfig.hero.image.src, 'Hero Image');
allImagesOk &&= checkImage(clinicConfig.about.image, 'About Architecture Image');
allImagesOk &&= checkImage(clinicConfig.practitioner.image, 'Practitioner Portrait');

for (const t of clinicConfig.treatments.items) {
  allImagesOk &&= checkImage(t.image, `Treatment: ${t.title}`);
}

for (const g of clinicConfig.gallery.items) {
  allImagesOk &&= checkImage(g.image, `Gallery: ${g.title}`);
}

if (!allImagesOk) {
  console.error('FAIL: One or more images failed verification');
  process.exit(1);
}

// 2. Test getWhatsAppAction
const testDemoAction = getWhatsAppAction('Hello test');
console.log('Testing WhatsApp action with empty number (demo mode):');
console.log(`  isConfigured: ${testDemoAction.isConfigured} (expected: false)`);
console.log(`  url: ${testDemoAction.url}`);
if (testDemoAction.isConfigured !== false || !testDemoAction.url.includes('wa.me/?text=Hello%20test')) {
  console.error('FAIL: getWhatsAppAction demo mode behavior mismatch');
  process.exit(1);
}
console.log('✓ getWhatsAppAction fallback verified');

// 3. Test dist build files
const distIndex = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(distIndex)) {
  console.error('FAIL: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}
const htmlContent = fs.readFileSync(distIndex, 'utf-8');
if (!htmlContent.includes('Aura Skin & Aesthetics') && !htmlContent.includes('cosmetics-clinic-website') && !htmlContent.includes('root')) {
  console.error('FAIL: dist/index.html structure unexpected');
  process.exit(1);
}
console.log('✓ Production dist build verified');

// 4. Verify all components exist
const components = [
  'Navbar.jsx', 'Navbar.css',
  'Hero.jsx', 'Hero.css',
  'Treatments.jsx', 'Treatments.css',
  'Packages.jsx', 'Packages.css',
  'About.jsx', 'About.css',
  'Practitioner.jsx', 'Practitioner.css',
  'HowItWorks.jsx', 'HowItWorks.css',
  'Gallery.jsx', 'Gallery.css',
  'Reviews.jsx', 'Reviews.css',
  'Faq.jsx', 'Faq.css',
  'Contact.jsx', 'Contact.css',
  'Footer.jsx', 'Footer.css',
  'WhatsAppPlaceholderModal.jsx', 'WhatsAppPlaceholderModal.css'
];

for (const comp of components) {
  const p = path.join(__dirname, 'src', 'components', comp);
  if (!fs.existsSync(p)) {
    console.error(`FAIL: Component missing: ${comp}`);
    process.exit(1);
  }
}
console.log(`✓ All ${components.length / 2} UI components and their respective stylesheets verified`);

console.log('--- All Verification Tests Passed Successfully! ---');
