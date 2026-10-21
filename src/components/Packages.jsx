import React from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './Packages.css';

export default function Packages({ onOpenWhatsAppModal }) {
  const { t } = useLanguage();
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
          <span className="section-tag">{t.packages.sectionTag || packages.sectionTag}</span>
          <h2 id="packages-title" className="section-title">{t.packages.title || packages.title}</h2>
          <p className="section-subtitle">{t.packages.subtitle || packages.subtitle}</p>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {packages.items.map((basePkg) => {
            const localized = t.packages?.items?.find((i) => i.id === basePkg.id) || {};
            const name = localized.name || basePkg.name;
            const subtitle = localized.subtitle || basePkg.subtitle;
            const samplePrice = localized.samplePrice || basePkg.samplePrice;
            const originalPriceNote = localized.originalPriceNote || basePkg.originalPriceNote;
            const inclusions = localized.inclusions || basePkg.inclusions;
            const highlight = localized.highlight || basePkg.highlight;
            const enquiryMessage = localized.enquiryMessage || basePkg.enquiryMessage;

            const action = getWhatsAppAction(enquiryMessage);

            return (
              <article key={basePkg.id} className="package-card">
                {highlight && (
                  <div className="package-highlight-badge">
                    <span>{highlight}</span>
                  </div>
                )}

                <div className="package-header">
                  <h3 className="package-name">{name}</h3>
                  <p className="package-subtitle">{subtitle}</p>
                </div>

                <div className="package-pricing">
                  <div className="package-price-val">{samplePrice}</div>
                  <span className="package-price-note">{originalPriceNote}</span>
                </div>

                <ul className="package-inclusions" aria-label={`Inclusions for ${name}`}>
                  {inclusions.map((inc, i) => (
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
                    onClick={(e) => handleEnquire(e, { ...basePkg, enquiryMessage })}
                    className="btn btn-whatsapp package-cta-btn"
                    aria-label={`${t.common.enquire || 'Enquire'} - ${name}`}
                  >
                    <span>{t.common.enquire || 'Enquire'}</span>
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
