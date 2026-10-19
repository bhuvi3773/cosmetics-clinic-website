import React from 'react';
import { clinicConfig } from '../data/clinicData';
import './Footer.css';

export default function Footer() {
  const { brand, navigation, contact, disclaimer } = clinicConfig;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-brand-title">
            <span className="footer-monogram" aria-hidden="true">{brand.monogram}</span>
            <span className="footer-name">{brand.name}</span>
          </div>
          <p className="footer-tagline">{brand.tagline}</p>
          <p className="footer-mode-pill">Front-End Website Template</p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-nav-list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="footer-nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Summary Column */}
        <div className="footer-contact-col">
          <h4 className="footer-heading">Clinic Contact [Placeholders]</h4>
          <div className="footer-contact-info">
            <p className="contact-line"><strong>Address:</strong> {contact.addressDisplay}</p>
            <p className="contact-line"><strong>Hours:</strong> {contact.openingHoursDisplay}</p>
            <p className="contact-line"><strong>WhatsApp:</strong> {contact.whatsAppDisplay}</p>
            <p className="contact-line"><strong>Email:</strong> {contact.emailDisplay}</p>
          </div>
        </div>
      </div>

      {/* Medical Safeguard Disclaimer */}
      <div className="container">
        <div className="footer-disclaimer-box">
          <p className="disclaimer-text">
            <strong>Medical Safeguard Notice:</strong> {disclaimer}
          </p>
        </div>

        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} {brand.name}. Front-end website template. All details are sample placeholders.</p>
          <a href="#home" className="footer-back-to-top" aria-label="Back to top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
