import React, { useState } from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl, handleImageFallback } from '../utils/imageUtils';
import './Treatments.css';

export default function Treatments({ onOpenWhatsAppModal }) {
  const { t } = useLanguage();
  const { treatments } = clinicConfig;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? treatments.items
    : treatments.items.filter((item) => item.category === selectedCategory);

  const handleEnquire = (e, treatment) => {
    const action = getWhatsAppAction(treatment.enquiryMessage);
    if (!action.isConfigured) {
      e.preventDefault();
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(treatment.enquiryMessage);
      }
    }
  };

  return (
    <section id="treatments" className="section treatments-section" aria-labelledby="treatments-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">{t.treatments.sectionTag || treatments.sectionTag}</span>
          <h2 id="treatments-title" className="section-title">{t.treatments.title || treatments.title}</h2>
          <p className="section-subtitle">{t.treatments.subtitle || treatments.subtitle}</p>
        </div>

        {/* Category Filters */}
        <div className="treatment-filters" role="tablist" aria-label="Filter treatments by category">
          {treatments.categories.map((cat) => {
            const displayLabel = cat === 'All'
              ? (t.treatments.allCategories || 'All')
              : (t.treatments.categories?.[cat] || cat);

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>

        {/* Treatments Grid */}
        <div className="treatments-grid">
          {filteredItems.map((baseItem) => {
            const localized = t.treatments?.items?.find((i) => i.id === baseItem.id) || {};
            const title = localized.title || baseItem.title;
            const description = localized.description || baseItem.description;
            const categoryLabel = localized.category || baseItem.category;
            const duration = localized.duration || baseItem.duration;
            const suitableFor = localized.suitableFor || baseItem.suitableFor;
            const samplePrice = localized.samplePrice || baseItem.samplePrice;
            const badge = localized.badge || baseItem.badge;
            const enquiryMessage = localized.enquiryMessage || baseItem.enquiryMessage;

            const action = getWhatsAppAction(enquiryMessage);

            return (
              <article key={baseItem.id} className="treatment-card">
                {baseItem.image && (
                  <div className="treatment-media-wrap">
                    <img
                      src={getOptimizedImageUrl(baseItem.image)}
                      alt={baseItem.alt || title}
                      className="treatment-card-img"
                      loading="eager"
                      decoding="async"
                      width="380"
                      height="240"
                      onError={handleImageFallback}
                    />
                    <div className="treatment-media-overlay" aria-hidden="true"></div>
                    <div className="treatment-card-sheen" aria-hidden="true"></div>
                    <span className="treatment-category-badge">{categoryLabel}</span>
                    {badge && <span className="treatment-badge">{badge}</span>}
                  </div>
                )}

                <div className="treatment-content">
                  <h3 className="treatment-title">{title}</h3>
                  <p className="treatment-desc">{description}</p>

                  <div className="treatment-meta">
                    <div className="meta-item">
                      <span className="meta-label">{t.common.formatLabel || 'Format:'}</span>
                      <span className="meta-val">{duration}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{t.common.focusLabel || 'Focus:'}</span>
                      <span className="meta-val">{suitableFor}</span>
                    </div>
                  </div>

                  <div className="treatment-card-footer">
                    <div className="treatment-price-wrap">
                      <span className="price-tag">{samplePrice}</span>
                    </div>
                    <a
                      href={action.url || '#'}
                      target={action.isConfigured ? '_blank' : undefined}
                      rel={action.isConfigured ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleEnquire(e, { ...baseItem, enquiryMessage })}
                      className="btn btn-secondary treatment-cta-btn"
                      aria-label={`${t.common.enquire || 'Enquire'} - ${title}`}
                    >
                      <span>{t.common.enquire || 'Enquire'}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Consultation Disclaimer Note */}
        <div className="treatments-note">
          <p>
            {t.treatments.consultationNote || treatments.consultationNote}
          </p>
        </div>
      </div>
    </section>
  );
}
