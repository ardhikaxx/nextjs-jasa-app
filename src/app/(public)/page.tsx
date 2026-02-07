'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiUser,
  FiPlus,
} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import RedirectIfAuthed from '@/components/landing/RedirectIfAuthed';
import { useI18n } from '@/i18n/LanguageProvider';

const HeroDecor = dynamic(() => import('@/components/landing/HeroDecor'), {
  ssr: false,
});

const StatsCard = dynamic(() => import('@/components/landing/StatsCard'), {
  ssr: false,
});

export default function Home() {
  const { t } = useI18n();
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };

    const show = () => {
      if (!cancelled) setShowExtras(true);
    };

    const onFirstInput = () => {
      cleanup();
      show();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', onFirstInput);
      window.removeEventListener('keydown', onFirstInput);
      window.removeEventListener('touchstart', onFirstInput);
      window.removeEventListener('scroll', onFirstInput);
    };

    window.addEventListener('pointerdown', onFirstInput, { passive: true });
    window.addEventListener('keydown', onFirstInput, { passive: true });
    window.addEventListener('touchstart', onFirstInput, { passive: true });
    window.addEventListener('scroll', onFirstInput, { passive: true });

    if (w.requestIdleCallback) {
      w.requestIdleCallback(show, { timeout: 5000 });
    } else {
      setTimeout(show, 5000);
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <RedirectIfAuthed />
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden py-3 z-10">
        {showExtras && <HeroDecor />}

        <div className="relative z-10 w-full max-w-lg mx-auto py-6">
          <div className="flex justify-center items-center flex-col w-full mx-auto px-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center font-daydream text-white">
              MUMET.IN
            </h1>
            <p className="text-base sm:text-lg mb-5 text-gray-100 text-center px-2">
              {t('landing.subtitle')}
            </p>
            <p className="text-xs sm:text-sm text-gray-300 text-center mb-6">
              {t('landing.microcopy')}
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-4 mb-2 w-full max-w-xs sm:max-w-none">
              <Link
                href="/login"
                className="bg-white text-[#c41e2e] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex justify-center items-center w-full sm:w-auto z-20 relative"
              >
                <FiUser size={20} className="me-2" />
                {t('landing.login')}
              </Link>
              <Link
                href="/register"
                className="border border-white/80 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#c41e2e] transition flex justify-center items-center w-full sm:w-auto z-20 relative"
              >
                <FiPlus size={20} className="me-2" />
                {t('landing.register')}
              </Link>
            </div>
            <p className="text-xs text-gray-300 text-center mt-2">
              {t('landing.ctaStrong')}
            </p>
          </div>

          {showExtras ? (
            <StatsCard />
          ) : (
            <div className="relative mt-3 sm:mt-4 bg-white/10 rounded-3xl border border-gray-100 px-6 sm:px-10 py-6 w-full mx-auto text-center z-20 min-h-52.5">
              <div className="relative z-10">
                <div className="h-3 w-40 mx-auto rounded-full bg-white/20 mb-4"></div>
                <div className="h-10 w-56 mx-auto rounded-full bg-white/20 mb-3"></div>
                <div className="h-3 w-64 mx-auto rounded-full bg-white/20 mb-4"></div>
                <div className="h-8 w-48 mx-auto rounded-xl bg-white/20"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
