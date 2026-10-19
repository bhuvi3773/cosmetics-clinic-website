import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsAppPlaceholderModal from './components/WhatsAppPlaceholderModal';
import { clinicConfig } from './data/clinicData';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(clinicConfig.contact.defaultEnquiryMessage);

  const handleOpenWhatsAppModal = (customMessage) => {
    setModalMessage(customMessage || clinicConfig.contact.defaultEnquiryMessage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="clinic-app">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Demo Configuration Notice Banner */}
      <div className="demo-top-notice" role="status">
        <span className="notice-pill">Template Mode</span>
        <span>
          Aesthetic Clinic Template Foundation — Contact points and business details are editable placeholders in <code>clinicData.js</code>
        </span>
      </div>

      {/* Responsive Header & Navigation */}
      <Navbar onOpenWhatsAppModal={handleOpenWhatsAppModal} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Batch 1: Hero Section */}
        <Hero onOpenWhatsAppModal={handleOpenWhatsAppModal} />

        {/* Section Anchors for upcoming batches (Ensures navigation targets are accessible) */}
        <section id="treatments" className="batch-preview-section">
          <div className="container">
            <div className="preview-card">
              <span className="section-tag">Batch 2 Target</span>
              <h2 className="preview-title">Treatments & Services [Sample]</h2>
              <p className="preview-text">
                Sample treatment categories, service overviews, and consultation enquiry actions will be rendered here in Batch 2.
              </p>
              <div className="preview-indicator">
                <span className="indicator-dot"></span>
                <span>Anchor <code>#treatments</code> verified and ready</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="batch-preview-section preview-subtle">
          <div className="container">
            <div className="preview-card">
              <span className="section-tag">Batch 2 Target</span>
              <h2 className="preview-title">About the Clinic [Sample]</h2>
              <p className="preview-text">
                Clinic approach, premises overview, and practitioner credentials placeholder will be structured here in Batch 2 without unverified claims.
              </p>
              <div className="preview-indicator">
                <span className="indicator-dot"></span>
                <span>Anchor <code>#about</code> verified and ready</span>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="batch-preview-section">
          <div className="container">
            <div className="preview-card">
              <span className="section-tag">Batch 3 Target</span>
              <h2 className="preview-title">Clinic Gallery & Ambiance</h2>
              <p className="preview-text">
                Private treatment suite previews and clinic aesthetic environment grid will be introduced in Batch 3.
              </p>
              <div className="preview-indicator">
                <span className="indicator-dot"></span>
                <span>Anchor <code>#gallery</code> verified and ready</span>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="batch-preview-section preview-subtle">
          <div className="container">
            <div className="preview-card">
              <span className="section-tag">Batch 3 Target</span>
              <h2 className="preview-title">Frequently Asked Questions</h2>
              <p className="preview-text">
                Accordion with verified consultation guidance, appointment protocols, and parking details will be rendered in Batch 3.
              </p>
              <div className="preview-indicator">
                <span className="indicator-dot"></span>
                <span>Anchor <code>#faqs</code> verified and ready</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="batch-preview-section">
          <div className="container">
            <div className="preview-card">
              <span className="section-tag">Batch 3 Target</span>
              <h2 className="preview-title">Contact & Consultation Enquiries</h2>
              <p className="preview-text">
                Direct WhatsApp consultation action, clinic address, opening hours, and enquiry form will be rendered in Batch 3.
              </p>
              <div className="preview-indicator">
                <span className="indicator-dot"></span>
                <span>Anchor <code>#contact</code> verified and ready</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Foundation Footer */}
      <footer className="foundation-footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <span className="footer-title">{clinicConfig.brand.name}</span>
            <span className="footer-tagline">{clinicConfig.brand.tagline}</span>
          </div>
          <p className="footer-disclaimer">
            {clinicConfig.disclaimer}
          </p>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} {clinicConfig.brand.name}. Front-end website template.
          </div>
        </div>
      </footer>

      {/* Accessible WhatsApp Modal */}
      <WhatsAppPlaceholderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
        rawNumber={clinicConfig.contact.whatsAppNumber}
      />
    </div>
  );
}

export default App;
