import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const { brand, navigation, contact, disclaimer } = clinicConfig;
  const currentYear = new Date().getFullYear();

  const copyrightText = typeof t.footer?.copyright === 'function'
    ? t.footer.copyright(currentYear, brand.name)
    : `© ${currentYear} ${brand.name}. Front-end website template. All details are sample placeholders.`;

  const rawDisclaimer = t.footer?.disclaimer || disclaimer;
  const safeguardPrefix = t.footer?.safeguardNotice || 'Medical Safeguard Notice:';
  const cleanDisclaimer = rawDisclaimer.startsWith(safeguardPrefix)
    ? rawDisclaimer.slice(safeguardPrefix.length).trim()
    : rawDisclaimer;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-brand-container">
            <div className="footer-logo-container" aria-hidden="true">
              <span className="footer-monogram">{brand.monogram}</span>
            </div>
            <div className="footer-divider" aria-hidden="true"></div>
            <div className="footer-text-container">
              <span className="footer-name">{brand.name}</span>
            </div>
          </div>
          <p className="footer-tagline">{brand.tagline}</p>
          <p className="footer-mode-pill">{t.footer?.templatePill || 'Front-End Website Template'}</p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">{t.footer?.navigationHeading || 'Navigation'}</h4>
          <ul className="footer-nav-list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="footer-nav-link">
                  {t.nav?.[item.id] || item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Summary Column */}
        <div className="footer-contact-col">
          <h4 className="footer-heading">{t.footer?.contactHeading || 'Clinic Contact [Placeholders]'}</h4>
          <div className="footer-contact-info">
            <p className="contact-line"><strong>{t.contact?.methodAddress || 'Clinic Address:'}</strong> {contact.addressDisplay}</p>
            <p className="contact-line"><strong>{t.contact?.methodHours || 'Clinic Hours:'}</strong> {contact.openingHoursDisplay}</p>
            <p className="contact-line"><strong>{t.contact?.methodWhatsApp || 'Direct WhatsApp:'}</strong> {contact.whatsAppDisplay}</p>
            <p className="contact-line"><strong>{t.contact?.methodEmail || 'Email:'}</strong> {contact.emailDisplay}</p>
          </div>
        </div>
      </div>

      {/* Medical Safeguard Disclaimer */}
      <div className="container">
        <div className="footer-disclaimer-box">
          <p className="disclaimer-text">
            <strong>{safeguardPrefix}</strong> {cleanDisclaimer}
          </p>
        </div>

        <div className="footer-bottom-bar">
          <p>{copyrightText}</p>
          <a href="#home" className="footer-back-to-top" aria-label={t.footer?.backToTop || 'Back to top'}>
            {t.footer?.backToTop || 'Back to top ↑'}
          </a>
        </div>
      </div>
    </footer>
  );
}
