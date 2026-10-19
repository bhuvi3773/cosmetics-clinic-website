import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import './Gallery.css';

export default function Gallery() {
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
          <span className="section-tag">{gallery.sectionTag}</span>
          <h2 id="gallery-title" className="section-title">{gallery.title}</h2>
          <p className="section-subtitle">{gallery.subtitle}</p>
        </div>

        <div className="gallery-grid">
          {gallery.items.map((item) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(item);
                }
              }}
              aria-label={`View enlarged photo of ${item.title}`}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-category-pill">{item.category}</span>
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <span className="gallery-zoom-hint" aria-hidden="true">Click to enlarge ↗</span>
                </div>
              </div>
            </div>
          ))}
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
