import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import './Faq.css';

export default function Faq() {
  const { faqs } = clinicConfig;
  const [openId, setOpenId] = useState(faqs.items[0]?.id || null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="section faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{faqs.sectionTag}</span>
          <h2 id="faq-title" className="section-title">{faqs.title}</h2>
          <p className="section-subtitle">{faqs.subtitle}</p>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions Accordion">
          {faqs.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className="faq-answer-panel"
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  hidden={!isOpen}
                >
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
