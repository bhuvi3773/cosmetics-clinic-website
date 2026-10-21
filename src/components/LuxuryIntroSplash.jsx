import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../data/clinicData';
import './LuxuryIntroSplash.css';

export default function LuxuryIntroSplash({ onComplete }) {
  const [stage, setStage] = useState('active'); // 'active' | 'exiting' | 'hidden'
  const brand = clinicConfig.brand;

  useEffect(() => {
    // Stage transition timers
    const timerExit = setTimeout(() => {
      setStage('exiting');
    }, 1800);

    const timerDone = setTimeout(() => {
      setStage('hidden');
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(timerExit);
      clearTimeout(timerDone);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setStage('exiting');
    setTimeout(() => {
      setStage('hidden');
      if (onComplete) onComplete();
    }, 400);
  };

  if (stage === 'hidden') return null;

  return (
    <div
      className={`luxury-splash-overlay ${stage === 'exiting' ? 'is-exiting' : ''}`}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Aura Aesthetics"
    >
      {/* Background Ambient Aura Glows */}
      <div className="splash-ambient-aura aura-primary" aria-hidden="true"></div>
      <div className="splash-ambient-aura aura-secondary" aria-hidden="true"></div>

      {/* Floating Micro Shimmer Particles */}
      <div className="splash-sparkles" aria-hidden="true">
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✧</span>
        <span className="sparkle s3">✦</span>
        <span className="sparkle s4">✧</span>
      </div>

      <div className="splash-content">
        {/* Monogram Seal with Animated Rings */}
        <div className="splash-emblem-wrap">
          <div className="emblem-orbital-ring outer-ring" aria-hidden="true"></div>
          <div className="emblem-orbital-ring inner-ring" aria-hidden="true"></div>
          <div className="emblem-disc">
            <span className="emblem-letter">{brand.monogram || 'A'}</span>
          </div>
        </div>

        {/* Brand Name with Staggered Reveal */}
        <div className="splash-typography">
          <span className="splash-eyebrow">CLINICAL AESTHETICS & DERMAL SANCTUARY</span>
          <h1 className="splash-brand-title">
            <span className="brand-word">AURA</span>
            <span className="brand-dot">·</span>
            <span className="brand-word">AESTHETICS</span>
          </h1>
          <div className="splash-gold-filament" aria-hidden="true"></div>
          <p className="splash-tagline">{brand.tagline || 'Bespoke Aesthetics & Restorative Skin Health'}</p>
        </div>

        {/* Minimalist Progress Filament */}
        <div className="splash-progress-track" aria-hidden="true">
          <div className="splash-progress-bar"></div>
        </div>

        {/* Skip / Enter Touch Action */}
        <button
          type="button"
          className="splash-skip-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Enter clinic website immediately"
        >
          <span>Enter Sanctuary</span>
          <span className="skip-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
