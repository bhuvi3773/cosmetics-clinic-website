import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import Packages from './components/Packages';
import About from './components/About';
import Practitioner from './components/Practitioner';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
          Aesthetic Clinic Template Demo — Contact points, treatment menu, and practitioner details are customizable placeholders in <code>clinicData.js</code>
        </span>
      </div>

      {/* Responsive Header & Navigation */}
      <Navbar onOpenWhatsAppModal={handleOpenWhatsAppModal} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero onOpenWhatsAppModal={handleOpenWhatsAppModal} />

        {/* 2. Treatments & Services */}
        <Treatments onOpenWhatsAppModal={handleOpenWhatsAppModal} />

        {/* 3. Curated Packages & Structured Series */}
        <Packages onOpenWhatsAppModal={handleOpenWhatsAppModal} />

        {/* 4. About Clinic & Philosophy */}
        <About />

        {/* 5. Practitioner Profile */}
        <Practitioner />

        {/* 6. What To Expect (3-Step Consultation Journey) */}
        <HowItWorks />

        {/* 7. Clinic Gallery & Ambiance */}
        <Gallery />

        {/* 8. Patient Feedback / Demo Reviews */}
        <Reviews />

        {/* 9. Frequently Asked Questions */}
        <Faq />

        {/* 10. Contact Details & Quick WhatsApp Consultation Form */}
        <Contact onOpenWhatsAppModal={handleOpenWhatsAppModal} />
      </main>

      {/* Complete Footer */}
      <Footer />

      {/* Accessible WhatsApp Modal for Demo Mode */}
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
