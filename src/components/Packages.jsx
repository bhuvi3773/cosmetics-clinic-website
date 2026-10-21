import React from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import './Packages.css';

export default function Packages({ onOpenWhatsAppModal }) {
  const { packages } = clinicConfig;

  const handleEnquire = (e, pkg) => {
    const action = getWhatsAppAction(pkg.enquiryMessage);
    if (!action.isConfigured) {
      e.preventDefault();
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(pkg.enquiryMessage);
      }
    }
  };

  return (
    <section id="packages" className="section packages-section" aria-labelledby="packages-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">{packages.sectionTag}</span>
          <h2 id="packages-title" className="section-title">{packages.title}</h2>
          <p className="section-subtitle">{packages.subtitle}</p>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {packages.items.map((pkg) => {
            const action = getWhatsAppAction(pkg.enquiryMessage);
            return (
              <article key={pkg.id} className="package-card">
                {pkg.highlight && (
                  <div className="package-highlight-badge">
                    <span>{pkg.highlight}</span>
                  </div>
                )}

                <div className="package-header">
                  <h3 className="package-name">{pkg.name}</h3>
                  <p className="package-subtitle">{pkg.subtitle}</p>
                </div>

                <div className="package-pricing">
                  <div className="package-price-val">{pkg.samplePrice}</div>
                  <span className="package-price-note">{pkg.originalPriceNote}</span>
                </div>

                <ul className="package-inclusions" aria-label={`Inclusions for ${pkg.name}`}>
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="inclusion-item">
                      <span className="inclusion-check" aria-hidden="true">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-footer">
                  <a
                    href={action.url || '#'}
                    target={action.isConfigured ? '_blank' : undefined}
                    rel={action.isConfigured ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleEnquire(e, pkg)}
                    className="btn btn-whatsapp package-cta-btn"
                    aria-label={`Enquire about ${pkg.name}`}
                  >
                    <span>Enquire</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
