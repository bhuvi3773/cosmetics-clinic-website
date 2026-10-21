import React, { useState } from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import './Contact.css';

export default function Contact({ onOpenWhatsAppModal }) {
  const { contact, treatments, contactForm } = clinicConfig;
  const whatsAppAction = getWhatsAppAction();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: treatments.items[0]?.title || '',
    timePreference: 'Morning (10:00 AM – 1:00 PM)',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedMessage = `Hello ${clinicConfig.brand.name},\nMy name is ${formData.name || 'a visitor'}.\nI would like to enquire about: ${formData.treatment}.\nPreferred Time: ${formData.timePreference}.\nNotes: ${formData.notes || 'None provided.'}`;

    const action = getWhatsAppAction(formattedMessage);

    if (!action.isConfigured) {
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(formattedMessage);
      }
    } else {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDirectWhatsApp = (e) => {
    if (!whatsAppAction.isConfigured) {
      e.preventDefault();
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(whatsAppAction.displayMessage);
      }
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{contactForm.sectionTag}</span>
          <h2 id="contact-title" className="section-title">{contactForm.title}</h2>
          <p className="section-subtitle">{contactForm.subtitle}</p>
        </div>

        <div className="contact-grid">
          {/* Clinic Details Column */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="info-card-title">Clinic Visiting & Enquiries</h3>
              <p className="info-card-intro">
                All treatments and consultations take place in-person at our clinic suites. Reach out directly via WhatsApp for quick scheduling.
              </p>

              <div className="contact-methods-list">
                <div className="contact-method-item">
                  <div className="method-icon" aria-hidden="true">💬</div>
                  <div className="method-text">
                    <span className="method-label">Direct WhatsApp:</span>
                    <a
                      href={whatsAppAction.url || '#'}
                      target={whatsAppAction.isConfigured ? '_blank' : undefined}
                      rel={whatsAppAction.isConfigured ? 'noopener noreferrer' : undefined}
                      onClick={handleDirectWhatsApp}
                      className="method-link"
                    >
                      {contact.whatsAppDisplay}
                    </a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="method-icon" aria-hidden="true">📞</div>
                  <div className="method-text">
                    <span className="method-label">Telephone:</span>
                    <span className="method-val">{contact.phoneDisplay}</span>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="method-icon" aria-hidden="true">✉️</div>
                  <div className="method-text">
                    <span className="method-label">Email:</span>
                    <span className="method-val">{contact.emailDisplay}</span>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="method-icon" aria-hidden="true">📍</div>
                  <div className="method-text">
                    <span className="method-label">Clinic Address:</span>
                    <span className="method-val">{contact.addressDisplay}</span>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="method-icon" aria-hidden="true">🕒</div>
                  <div className="method-text">
                    <span className="method-label">Clinic Hours:</span>
                    <span className="method-val">{contact.openingHoursDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="direct-whatsapp-action">
                <a
                  href={whatsAppAction.url || '#'}
                  target={whatsAppAction.isConfigured ? '_blank' : undefined}
                  rel={whatsAppAction.isConfigured ? 'noopener noreferrer' : undefined}
                  onClick={handleDirectWhatsApp}
                  className="btn btn-whatsapp full-width-btn"
                >
                  <span className="status-dot" aria-hidden="true"></span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.245-.038.382.29.144.346.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2 1.054.94 1.942 1.23 2.217 1.374.275.145.433.13.592-.058.159-.188.679-.794.86-.1.066.181.274.22.462.29.188.07.318.116.361.188.043.072.043.419-.101.824z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Quick Enquiry Form (Frontend-only) */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">Prepare Consultation Enquiry</h3>
              <p className="form-card-desc">
                Fill in your details below to compose a prefilled WhatsApp enquiry message.
              </p>

              <form onSubmit={handleSubmit} className="enquiry-form">
                <div className="form-group">
                  <label htmlFor="form-name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-treatment" className="form-label">Treatment of Interest</label>
                  <select
                    id="form-treatment"
                    name="treatment"
                    className="form-select"
                    value={formData.treatment}
                    onChange={handleChange}
                  >
                    {treatments.items.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                    <option value="General Consultation">General Skin Assessment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-time" className="form-label">Preferred Appointment Time</label>
                  <select
                    id="form-time"
                    name="timePreference"
                    className="form-select"
                    value={formData.timePreference}
                    onChange={handleChange}
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                    <option value="Saturday Appointment">Saturday Appointment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-notes" className="form-label">Notes or Skin Considerations (Optional)</label>
                  <textarea
                    id="form-notes"
                    name="notes"
                    className="form-textarea"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us any specific skin concerns or consultation requests..."
                  />
                </div>

                <button type="submit" className="btn btn-whatsapp full-width-btn">
                  <span>Send via WhatsApp</span>
                  <span aria-hidden="true">→</span>
                </button>

                <p className="form-privacy-note">
                  {contactForm.notice}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
