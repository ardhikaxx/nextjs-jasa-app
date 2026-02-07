'use client';

import { FiGlobe } from 'react-icons/fi';
import { useI18n } from '@/i18n/LanguageProvider';

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('lang.toggle')}
      className="fixed top-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-lg transition hover:bg-white/20"
    >
      <FiGlobe size={16} />
      <span>{lang === 'id' ? t('lang.id') : t('lang.en')}</span>
    </button>
  );
}
