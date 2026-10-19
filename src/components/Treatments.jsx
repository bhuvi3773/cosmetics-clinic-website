import React, { useState } from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import './Treatments.css';

export default function Treatments({ onOpenWhatsAppModal }) {
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
          <span className="section-tag">{treatments.sectionTag}</span>
          <h2 id="treatments-title" className="section-title">{treatments.title}</h2>
          <p className="section-subtitle">{treatments.subtitle}</p>
        </div>

        {/* Category Filters */}
        <div className="treatment-filters" role="tablist" aria-label="Filter treatments by category">
          {treatments.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="treatments-grid">
          {filteredItems.map((item) => {
            const action = getWhatsAppAction(item.enquiryMessage);
            return (
              <article key={item.id} className="treatment-card">
                <div className="treatment-card-header">
                  <span className="treatment-category-badge">{item.category}</span>
                  {item.badge && <span className="treatment-badge">{item.badge}</span>}
                </div>

                <h3 className="treatment-title">{item.title}</h3>
                <p className="treatment-desc">{item.description}</p>

                <div className="treatment-meta">
                  <div className="meta-item">
                    <span className="meta-label">Format:</span>
                    <span className="meta-val">{item.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Focus:</span>
                    <span className="meta-val">{item.suitableFor}</span>
                  </div>
                </div>

                <div className="treatment-card-footer">
                  <div className="treatment-price-wrap">
                    <span className="price-tag">{item.samplePrice}</span>
                  </div>
                  <a
                    href={action.url || '#'}
                    target={action.isConfigured ? '_blank' : undefined}
                    rel={action.isConfigured ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleEnquire(e, item)}
                    className="btn btn-secondary treatment-cta-btn"
                    aria-label={`Enquire via WhatsApp about ${item.title}`}
                  >
                    <span>Enquire</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Consultation Disclaimer Note */}
        <div className="treatments-note">
          <p>
            <strong>Consultation Note:</strong> Individual treatment suitability and protocol selection are determined strictly during an in-person clinical assessment. Prices listed are demonstration examples.
          </p>
        </div>
      </div>
    </section>
  );
}
