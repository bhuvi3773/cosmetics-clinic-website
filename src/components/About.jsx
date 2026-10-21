import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl, handleImageFallback } from '../utils/imageUtils';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const { about } = clinicConfig;

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Text & Philosophy Column */}
          <div className="about-content">
            <span className="section-tag">{t.about.sectionTag || about.sectionTag}</span>
            <h2 id="about-title" className="section-title">{t.about.title || about.title}</h2>
            <p className="about-lead">{t.about.lead || about.lead}</p>
            <p className="about-text">{t.about.story1 || about.story1}</p>
            <p className="about-text">{t.about.story2 || about.story2}</p>

            {about.image && (
              <div className="about-media-frame">
                <img
                  src={getOptimizedImageUrl(about.image)}
                  alt={about.imageAlt}
                  className="about-image"
                  loading="eager"
                  decoding="async"
                  width="600"
                  height="400"
                  onError={handleImageFallback}
                />
                <div className="about-image-badge">
                  <span className="status-dot" aria-hidden="true"></span>
                  <span>{t.about.imageBadge || 'Serene Clinic Sanctuary [Sample]'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Values Cards Column */}
          <div className="about-values-column">
            <h3 className="values-heading">{t.about.valuesHeading || 'Clinical Values & Philosophy'}</h3>
            <div className="values-grid">
              {about.values.map((baseVal) => {
                const localized = t.about?.values?.find((v) => v.id === baseVal.id) || {};
                const title = localized.title || baseVal.title;
                const description = localized.description || baseVal.description;

                return (
                  <div key={baseVal.id} className="value-card">
                    <div className="value-indicator" aria-hidden="true">✦</div>
                    <h4 className="value-title">{title}</h4>
                    <p className="value-desc">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
