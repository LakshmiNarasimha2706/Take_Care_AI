import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  LanguageOption,
  getSavedLanguage,
  setSavedLanguage,
  translate,
  getLanguagePromptName,
} from '../services/i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  languageOptions: LanguageOption[];
  promptLanguageName: string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  languageOptions: SUPPORTED_LANGUAGES,
  promptLanguageName: 'English',
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(getSavedLanguage);

  useEffect(() => {
    // Set document lang attribute for accessibility and browser rendering
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setSavedLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  const t = (key: string) => translate(key, language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        languageOptions: SUPPORTED_LANGUAGES,
        promptLanguageName: getLanguagePromptName(language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
