import React from 'react';
import { clinicConfig } from '../data/clinicData';
import './Reviews.css';

export default function Reviews() {
  const { reviews } = clinicConfig;

  return (
    <section id="reviews" className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{reviews.sectionTag}</span>
          <h2 id="reviews-title" className="section-title">{reviews.title}</h2>
          <p className="section-subtitle">{reviews.subtitle}</p>
        </div>

        <div className="reviews-grid">
          {reviews.items.map((rev) => (
            <article key={rev.id} className="review-card">
              <div className="review-stars" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                {'★'.repeat(rev.rating)}
              </div>
              <blockquote className="review-quote">
                "{rev.quote}"
              </blockquote>
              <div className="review-footer">
                <div className="review-author">{rev.author}</div>
                <div className="review-treatment">{rev.treatment}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
