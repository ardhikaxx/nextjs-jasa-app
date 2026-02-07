'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLang, Lang, translations } from '@/i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    const stored = window.localStorage.getItem('lang') as Lang | null;
    if (stored === 'id' || stored === 'en') {
      setLangState(stored);
      document.documentElement.lang = stored;
      return;
    }
    document.documentElement.lang = defaultLang;
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem('lang', next);
    document.documentElement.lang = next;
  };

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  const t = (key: string) => translations[lang][key] ?? key;

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useI18n must be used within LanguageProvider');
  }
  return ctx;
}
