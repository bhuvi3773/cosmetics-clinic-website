import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './HowItWorks.css';

export default function HowItWorks() {
  const { t } = useLanguage();
  const { howItWorks } = clinicConfig;

  const steps = t.howItWorks.steps || howItWorks.steps;

  return (
    <section id="how-it-works" className="section how-it-works-section" aria-labelledby="how-it-works-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.howItWorks.sectionTag || howItWorks.sectionTag}</span>
          <h2 id="how-it-works-title" className="section-title">{t.howItWorks.title || howItWorks.title}</h2>
          <p className="section-subtitle">{t.howItWorks.subtitle || howItWorks.subtitle}</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number-wrap">
                <span className="step-number">{step.number}</span>
                <span className="step-line" aria-hidden="true"></span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
