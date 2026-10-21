import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './Gallery.css';

export default function Gallery() {
  const { t } = useLanguage();
  const { gallery } = clinicConfig;
  const [activeItem, setActiveItem] = useState(null);

  const openLightbox = (item) => {
    setActiveItem(item);
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.gallery.sectionTag || gallery.sectionTag}</span>
          <h2 id="gallery-title" className="section-title">{t.gallery.title || gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle || gallery.subtitle}</p>
        </div>

        <div className="gallery-grid">
          {gallery.items.map((baseItem) => {
            const localized = t.gallery?.items?.find((i) => i.id === baseItem.id) || {};
            const title = localized.title || baseItem.title;
            const category = localized.category || baseItem.category;
            const alt = localized.alt || baseItem.alt;
            const mergedItem = { ...baseItem, title, category, alt };

            return (
              <div
                key={baseItem.id}
                className="gallery-card"
                onClick={() => openLightbox(mergedItem)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(mergedItem);
                  }
                }}
                aria-label={`View enlarged photo of ${title}`}
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={baseItem.image}
                    alt={alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-category-pill">{category}</span>
                    <h3 className="gallery-item-title">{title}</h3>
                    <span className="gallery-zoom-hint" aria-hidden="true">
                      {t.gallery?.zoomHint || 'Click to enlarge ↗'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accessible Lightbox Modal */}
        {activeItem && (
          <div
            className="lightbox-backdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close image preview"
              >
                &times;
              </button>
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <h4>{activeItem.title}</h4>
                <p>{activeItem.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
