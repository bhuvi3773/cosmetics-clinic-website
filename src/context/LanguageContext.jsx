import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, supportedLanguages } from '../data/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'clinic_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved && ['en', 'te', 'hi'].includes(saved)) {
          return saved;
        }
      }
    } catch {
      // Fallback if localStorage is disabled or throws
    }
    return 'en';
  });

  const setLanguage = (newLang) => {
    if (['en', 'te', 'hi'].includes(newLang)) {
      setLanguageState(newLang);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, newLang);
        }
      } catch {
        // Ignore storage errors
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentTranslations = translations[language] || translations.en;

  const value = {
    language,
    setLanguage,
    t: currentTranslations,
    supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
