import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './Faq.css';

export default function Faq() {
  const { t } = useLanguage();
  const { faqs } = clinicConfig;
  const [openId, setOpenId] = useState(faqs.items[0]?.id || null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="section faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.faqs.sectionTag || faqs.sectionTag}</span>
          <h2 id="faq-title" className="section-title">{t.faqs.title || faqs.title}</h2>
          <p className="section-subtitle">{t.faqs.subtitle || faqs.subtitle}</p>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions Accordion">
          {faqs.items.map((baseItem) => {
            const localized = t.faqs?.items?.find((f) => f.id === baseItem.id) || {};
            const question = localized.question || baseItem.question;
            const answer = localized.answer || baseItem.answer;
            const isOpen = openId === baseItem.id;

            return (
              <div key={baseItem.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(baseItem.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${baseItem.id}`}
                  id={`faq-btn-${baseItem.id}`}
                >
                  <span className="faq-question-text">{question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  id={`faq-answer-${baseItem.id}`}
                  className="faq-answer-panel"
                  role="region"
                  aria-labelledby={`faq-btn-${baseItem.id}`}
                  hidden={!isOpen}
                >
                  <p className="faq-answer-text">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
