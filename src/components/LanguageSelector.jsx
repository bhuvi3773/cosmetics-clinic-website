import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

export default function LanguageSelector({ variant = 'header' }) {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  return (
    <div
      className={`lang-selector-wrap lang-selector-${variant}`}
      role="group"
      aria-label={t.common.languageSelectAria}
    >
      <div className="lang-icon-wrap" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>

      <div className="lang-buttons-group">
        {supportedLanguages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              className={`lang-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isActive}
              title={`Switch language to ${lang.label} (${lang.nativeName})`}
            >
              <span className="lang-code-text">{variant === 'drawer' ? lang.nativeName : lang.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
