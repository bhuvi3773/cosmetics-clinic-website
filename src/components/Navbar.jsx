import React, { useState, useEffect } from 'react';
import { clinicConfig, getWhatsAppAction } from '../data/clinicData';
import './Navbar.css';

export default function Navbar({ onOpenWhatsAppModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleWhatsAppClick = (e) => {
    const action = getWhatsAppAction();
    if (!action.isConfigured) {
      e.preventDefault();
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (onOpenWhatsAppModal) {
        onOpenWhatsAppModal(action.displayMessage);
      }
    }
  };

  const whatsAppAction = getWhatsAppAction();

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a href="#home" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-monogram" aria-hidden="true">
            {clinicConfig.brand.monogram}
          </span>
          <div className="brand-text">
            <span className="brand-name">{clinicConfig.brand.name}</span>
            <span className="brand-subtitle">{clinicConfig.brand.subtitle}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {clinicConfig.navigation.map((item) => (
              <li key={item.id} className="nav-item">
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions (WhatsApp Consultation CTA) */}
        <div className="navbar-actions desktop-actions">
          <a
            href={whatsAppAction.url || '#'}
            target={whatsAppAction.isConfigured ? '_blank' : undefined}
            rel={whatsAppAction.isConfigured ? 'noopener noreferrer' : undefined}
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp nav-cta-btn"
            aria-label="Enquire via WhatsApp"
          >
            <span className="status-dot" aria-hidden="true"></span>
            <svg
              className="whatsapp-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.245-.038.382.29.144.346.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2 1.054.94 1.942 1.23 2.217 1.374.275.145.433.13.592-.058.159-.188.679-.794.86-.1.066.181.274.22.462.29.188.07.318.116.361.188.043.072.043.419-.101.824z" />
            </svg>
            <span>Enquire Now</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className={`hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-navigation"
        className={`mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-drawer-backdrop" onClick={closeMobileMenu} />
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="brand-text">
              <span className="brand-name">{clinicConfig.brand.name}</span>
              <span className="brand-subtitle">{clinicConfig.brand.subtitle}</span>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {clinicConfig.navigation.map((item) => (
                <li key={item.id} className="mobile-nav-item">
                  <a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href={whatsAppAction.url || '#'}
              target={whatsAppAction.isConfigured ? '_blank' : undefined}
              rel={whatsAppAction.isConfigured ? 'noopener noreferrer' : undefined}
              onClick={handleWhatsAppClick}
              className="btn btn-whatsapp mobile-cta-btn"
            >
              <span className="status-dot" aria-hidden="true"></span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.245-.038.382.29.144.346.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2 1.054.94 1.942 1.23 2.217 1.374.275.145.433.13.592-.058.159-.188.679-.794.86-.1.066.181.274.22.462.29.188.07.318.116.361.188.043.072.043.419-.101.824z" />
              </svg>
              <span>Enquire via WhatsApp</span>
            </a>
            <p className="mobile-drawer-note">
              Template Preview • Configurable in clinicData.js
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
