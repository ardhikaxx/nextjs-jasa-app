'use client';

import Link from 'next/link';
import {
  FiUser,
  FiPlus,
} from 'react-icons/fi';
import Footer from '@/components/Footer';
import HeroDecor from '@/components/landing/HeroDecor';
import StatsCard from '@/components/landing/StatsCard';
import RedirectIfAuthed from '@/components/landing/RedirectIfAuthed';
import { useI18n } from '@/i18n/LanguageProvider';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <RedirectIfAuthed />
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden py-3 z-10">
        <HeroDecor />

        <div className="relative z-10 w-full max-w-lg mx-auto py-6">
          <div className="flex justify-center items-center flex-col w-full mx-auto px-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center font-daydream text-white">
              MUMET.IN
            </h1>
            <p className="text-base sm:text-lg mb-5 text-gray-100 text-center px-2">
              {t('landing.subtitle')}
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-4 mb-2 w-full max-w-xs sm:max-w-none">
              <Link
                href="/login"
                className="bg-white text-[#c41e2e] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition flex justify-center items-center w-full sm:w-auto z-20 relative"
              >
                <FiUser size={20} className="me-2" />
                {t('landing.login')}
              </Link>
              <Link
                href="/register"
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#c41e2e] transition flex justify-center items-center w-full sm:w-auto z-20 relative"
              >
                <FiPlus size={20} className="me-2" />
                {t('landing.register')}
              </Link>
            </div>
          </div>

          <StatsCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
