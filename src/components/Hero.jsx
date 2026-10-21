import React from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl, handleImageFallback } from '../utils/imageUtils';
import './Hero.css';

export default function Hero({ onOpenWhatsAppModal }) {
  const { t } = useLanguage();
  const { hero } = clinicConfig;

  const defaultMsg = t.treatments?.items?.[0]?.enquiryMessage || clinicConfig.contact.defaultEnquiryMessage;
  const whatsAppAction = getWhatsAppAction(defaultMsg);

  const handleWhatsAppClick = (e) => {
    if (!whatsAppAction.isConfigured) {
      e.preventDefault();
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(whatsAppAction.displayMessage);
      }
    }
  };

  const pillars = t.hero.pillars || hero.trustPillars;

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      {/* Dynamic Ambient Radiant Orbs for Cosmetics Atmosphere */}
      <div className="hero-ambient-orb orb-gold" aria-hidden="true"></div>
      <div className="hero-ambient-orb orb-rose" aria-hidden="true"></div>
      <div className="hero-ambient-orb orb-pearl" aria-hidden="true"></div>

      {/* Floating Ethereal Sparkles */}
      <div className="hero-sparkles-floating" aria-hidden="true">
        <span className="hero-sparkle hs-1">✦</span>
        <span className="hero-sparkle hs-2">✧</span>
        <span className="hero-sparkle hs-3">✦</span>
      </div>

      <div className="container hero-container">
        {/* Left / Editorial Content Column with gentle fade-and-rise entrance */}
        <div className="hero-content fade-rise">
          <div className="hero-badge-wrap">
            <span className="section-tag hero-cosmetic-tag">
              <span className="badge-sparkle" aria-hidden="true">✦</span>
              {t.hero.badge || hero.badge}
            </span>
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="title-block">{t.hero.titleLight || hero.title.light}</span>
            <span className="title-accent animated-luxury-shimmer">{t.hero.titleAccent || hero.title.accent}</span>
          </h1>

          <p className="hero-description">
            {t.hero.description || hero.description}
          </p>

          <div className="hero-actions">
            <a
              href={whatsAppAction.url || '#'}
              target={whatsAppAction.isConfigured ? '_blank' : undefined}
              rel={whatsAppAction.isConfigured ? 'noopener noreferrer' : undefined}
              onClick={handleWhatsAppClick}
              className="btn btn-whatsapp hero-primary-btn"
              aria-label={t.hero.primaryCta || hero.primaryCta.text}
            >
              <span className="status-dot" aria-hidden="true"></span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.245-.038.382.29.144.346.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2 1.054.94 1.942 1.23 2.217 1.374.275.145.433.13.592-.058.159-.188.679-.794.86-.1.066.181.274.22.462.29.188.07.318.116.361.188.043.072.043.419-.101.824z" />
              </svg>
              <span>{t.hero.primaryCta || hero.primaryCta.text}</span>
            </a>

            <a
              href={hero.secondaryCta.href}
              className="btn btn-secondary hero-secondary-btn"
            >
              <span>{t.hero.secondaryCta || hero.secondaryCta.text}</span>
              <span aria-hidden="true" className="btn-arrow">→</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="hero-trust-strip" aria-label="Feature Highlights">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="trust-pillar-item">
                <div className="pillar-bullet" aria-hidden="true"></div>
                <div className="pillar-text">
                  <span className="pillar-title">{pillar.title}</span>
                  <span className="pillar-desc">{pillar.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right / Luxury Architectural Imagery Column */}
        <div className="hero-media-wrapper">
          <div className="hero-image-frame">
            <img
              src={getOptimizedImageUrl(hero.image.src)}
              alt={hero.image.alt}
              className="hero-image"
              width="680"
              height="510"
              loading="eager"
              onError={handleImageFallback}
            />
            {/* Subtle luxury overlay gradient */}
            <div className="hero-image-gradient" aria-hidden="true"></div>

            {/* Radiant glass reflection sweep */}
            <div className="hero-sheen-sweep" aria-hidden="true"></div>

            {/* Floating Clinic Feature Badge */}
            <div className="hero-floating-card">
              <div className="floating-card-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="floating-card-text">
                <span className="floating-title">{t.hero.floatingBadgeTitle || hero.floatingBadge.title}</span>
                <span className="floating-desc">{t.hero.floatingBadgeText || hero.floatingBadge.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

