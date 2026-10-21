import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { useLanguage } from '../context/LanguageContext';
import './Reviews.css';

export default function Reviews() {
  const { t } = useLanguage();
  const { reviews } = clinicConfig;

  return (
    <section id="reviews" className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.reviews.sectionTag || reviews.sectionTag}</span>
          <h2 id="reviews-title" className="section-title">{t.reviews.title || reviews.title}</h2>
          <p className="section-subtitle">{t.reviews.subtitle || reviews.subtitle}</p>
        </div>

        <div className="reviews-grid">
          {reviews.items.map((baseRev) => {
            const localized = t.reviews?.items?.find((r) => r.id === baseRev.id) || {};
            const quote = localized.quote || baseRev.quote;
            const author = localized.author || baseRev.author;
            const treatment = localized.treatment || baseRev.treatment;
            const rating = baseRev.rating || 5;

            return (
              <article key={baseRev.id} className="review-card">
                <div className="review-stars" aria-label={`Rating: ${rating} out of 5 stars`}>
                  {'★'.repeat(rating)}
                </div>
                <blockquote className="review-quote">
                  "{quote}"
                </blockquote>
                <div className="review-footer">
                  <div className="review-author">{author}</div>
                  <div className="review-treatment">{treatment}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
