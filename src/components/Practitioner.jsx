import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl, handleImageFallback } from '../utils/imageUtils';
import './Practitioner.css';

export default function Practitioner() {
  const { t } = useLanguage();
  const { practitioner } = clinicConfig;

  const credentials = t.practitioner.credentials || practitioner.credentials;

  return (
    <section id="practitioner" className="section practitioner-section" aria-labelledby="practitioner-title">
      <div className="container">
        <div className="practitioner-card">
          <div className="practitioner-header">
            <span className="section-tag">{t.practitioner.sectionTag || practitioner.sectionTag}</span>
            <h2 id="practitioner-title" className="section-title">{t.practitioner.title || practitioner.title}</h2>
          </div>

          <div className="practitioner-body">
            <div className="practitioner-identity">
              {practitioner.image ? (
                <div className="practitioner-portrait-wrap">
                  <img
                    src={getOptimizedImageUrl(practitioner.image)}
                    alt={practitioner.imageAlt || practitioner.name}
                    className="practitioner-portrait-img"
                    loading="eager"
                    decoding="async"
                    width="96"
                    height="96"
                    onError={handleImageFallback}
                  />
                  <span className="portrait-status-dot" aria-hidden="true"></span>
                </div>
              ) : (
                <div className="practitioner-avatar-placeholder" aria-hidden="true">
                  <span>{clinicConfig.brand.monogram}</span>
                </div>
              )}
              <div className="practitioner-name-group">
                <h3 className="practitioner-name">{t.practitioner.name || practitioner.name}</h3>
                <span className="practitioner-role">{t.practitioner.role || practitioner.role}</span>
              </div>
            </div>

            <p className="practitioner-bio">{t.practitioner.bio || practitioner.bio}</p>

            <div className="credentials-block">
              <h4 className="credentials-title">
                {t.practitioner.credentialsHeading || 'Professional Qualifications & Registrations [Placeholders]'}
              </h4>
              <div className="credentials-chips" aria-label="Professional credentials placeholders">
                {credentials.map((cred, idx) => (
                  <span key={idx} className="credential-chip">
                    <span className="chip-icon" aria-hidden="true">✦</span>
                    <span>{cred}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="practitioner-notice-banner" role="note">
              <span className="notice-icon" aria-hidden="true">ℹ</span>
              <p>{t.practitioner.credentialsNotice || practitioner.credentialsNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
