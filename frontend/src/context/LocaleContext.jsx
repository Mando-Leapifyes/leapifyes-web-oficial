import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, getSavedLocale, saveLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../lib/i18n';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [t, setT] = useState(getTranslation(DEFAULT_LOCALE));

  useEffect(() => {
    const saved = getSavedLocale();
    setLocaleState(saved);
    setT(getTranslation(saved));
  }, []);

  const setLocale = (newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
      setT(getTranslation(newLocale));
      saveLocale(newLocale);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, SUPPORTED_LOCALES }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
