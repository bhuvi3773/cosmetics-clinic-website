import React from 'react';
import { clinicConfig } from '../data/clinicData';
import './About.css';

export default function About() {
  const { about } = clinicConfig;

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Text & Philosophy Column */}
          <div className="about-content">
            <span className="section-tag">{about.sectionTag}</span>
            <h2 id="about-title" className="section-title">{about.title}</h2>
            <p className="about-lead">{about.lead}</p>
            <p className="about-text">{about.story1}</p>
            <p className="about-text">{about.story2}</p>

            {about.image && (
              <div className="about-media-frame">
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  className="about-image"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="about-image-badge">
                  <span className="status-dot" aria-hidden="true"></span>
                  <span>Serene Clinic Sanctuary [Sample]</span>
                </div>
              </div>
            )}
          </div>

          {/* Values Cards Column */}
          <div className="about-values-column">
            <h3 className="values-heading">Clinical Values & Philosophy</h3>
            <div className="values-grid">
              {about.values.map((val) => (
                <div key={val.id} className="value-card">
                  <div className="value-indicator" aria-hidden="true">✦</div>
                  <h4 className="value-title">{val.title}</h4>
                  <p className="value-desc">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
