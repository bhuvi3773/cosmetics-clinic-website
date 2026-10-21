import React, { useEffect, useRef } from 'react';
import './WhatsAppPlaceholderModal.css';

/**
 * Accessible Modal shown when WhatsApp button is clicked
 * while the WhatsApp phone number is still in placeholder/demo mode.
 */
export default function WhatsAppPlaceholderModal({ isOpen, onClose, message, rawNumber }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when opened
      closeBtnRef.current?.focus();

      // Close on Escape key
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const demoUrl = `https://wa.me/?text=${encodeURIComponent(message || '')}`;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="modal-header">
          <div className="modal-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <span className="modal-kicker">Template Demo Configuration</span>
            <h3 id="modal-title" className="modal-title">WhatsApp Consultation Notice</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            ref={closeBtnRef}
          >
            &times;
          </button>
        </div>

        <div className="modal-body" id="modal-description">
          <p className="modal-intro">
            This website template uses a <strong>centralized clinic configuration</strong>. The clinic's real WhatsApp phone number has not been connected yet.
          </p>

          <div className="modal-code-callout">
            <div className="callout-label">To connect your live clinic WhatsApp:</div>
            <code>Open: src/data/clinicData.js</code>
            <p className="callout-instruction">
              Set <code>contact.whatsAppNumber = "447XXXXXXXXX"</code> in international digits (no + or spaces).
            </p>
          </div>

          <div className="modal-preview-message">
            <div className="preview-label">Prefilled Message Template:</div>
            <p className="preview-text">"{message}"</p>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp modal-demo-link"
            onClick={onClose}
          >
            <span>Test Launch</span>
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
