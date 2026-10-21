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

// 3. Verify Multilingual Translations & Templates
const translationsPath = path.join(__dirname, 'src', 'data', 'translations.js');
if (!fs.existsSync(translationsPath)) {
  console.error('FAIL: translations.js not found!');
  process.exit(1);
}

const translationsModule = await import('./src/data/translations.js');
const { translations, supportedLanguages } = translationsModule;

console.log('✓ translations.js loaded successfully');
console.log(`  Supported Languages: ${supportedLanguages.map(l => `${l.code} (${l.label})`).join(', ')}`);

const requiredLanguages = ['en', 'te', 'hi'];
const requiredSections = [
  'common', 'nav', 'hero', 'treatments', 'packages',
  'about', 'practitioner', 'howItWorks', 'gallery',
  'reviews', 'faqs', 'contact', 'modal', 'footer'
];

for (const lang of requiredLanguages) {
  if (!translations[lang]) {
    console.error(`FAIL: Missing translation set for language: ${lang}`);
    process.exit(1);
  }
  for (const sec of requiredSections) {
    if (!translations[lang][sec]) {
      console.error(`FAIL: Missing section '${sec}' in language '${lang}'`);
      process.exit(1);
    }
  }

  // Verify form WhatsApp message generator for each language
  const templateFn = translations[lang].contact.formWhatsAppTemplate;
  if (typeof templateFn !== 'function') {
    console.error(`FAIL: formWhatsAppTemplate is not a function for language '${lang}'`);
    process.exit(1);
  }

  const generatedMsg = templateFn(
    clinicConfig.brand.name,
    'Jane Doe',
    'Bespoke Dermal Peel',
    'Morning (10:00 AM – 1:00 PM)',
    'Looking forward to consultation.'
  );

  if (!generatedMsg || !generatedMsg.includes('Jane Doe') || !generatedMsg.includes('Bespoke Dermal Peel')) {
    console.error(`FAIL: Generated WhatsApp message malformed for '${lang}'`);
    process.exit(1);
  }

  console.log(`✓ Language '${lang}' verified with all 14 sections and WhatsApp generator`);
}

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
  'WhatsAppPlaceholderModal.jsx', 'WhatsAppPlaceholderModal.css',
  'LanguageSelector.jsx', 'LanguageSelector.css'
];

for (const comp of components) {
  const p = path.join(__dirname, 'src', 'components', comp);
  if (!fs.existsSync(p)) {
    console.error(`FAIL: Component missing: ${comp}`);
    process.exit(1);
  }
}
console.log(`✓ All ${components.length / 2} UI components and their respective stylesheets verified`);

// 5. Verify Language Context exists
const contextPath = path.join(__dirname, 'src', 'context', 'LanguageContext.jsx');
if (!fs.existsSync(contextPath)) {
  console.error('FAIL: LanguageContext.jsx missing!');
  process.exit(1);
}
console.log('✓ LanguageContext.jsx verified');

// 6. Test dist build files
const distIndex = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(distIndex)) {
  const htmlContent = fs.readFileSync(distIndex, 'utf-8');
  if (!htmlContent.includes('Aura Skin & Aesthetics') && !htmlContent.includes('cosmetics-clinic-website') && !htmlContent.includes('root')) {
    console.error('FAIL: dist/index.html structure unexpected');
    process.exit(1);
  }
  console.log('✓ Existing production dist build verified');
}

console.log('--- All Verification Tests Passed Successfully! ---');
