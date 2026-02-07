'use client';

import { useEffect, useState } from 'react';
import { FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useI18n } from '@/i18n/LanguageProvider';

export default function StatsCard() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/count', {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!cancelled) setUserCount(data.count);
      } catch (err) {
        if (!cancelled) {
          console.warn('User count unavailable:', err);
        }
      }
    };

    const schedule = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
      if (w.requestIdleCallback) {
        w.requestIdleCallback(fetchUsers);
      } else {
        setTimeout(fetchUsers, 800);
      }
    };

    schedule();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <div className="relative mt-3 sm:mt-4 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 px-6 sm:px-10 py-6 w-full mx-auto text-center z-20 min-h-52.5">
      <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>
      <h4 className="text-sm font-semibold text-white mb-2 font-daydream relative z-10">
        {t('stats.title')}
      </h4>
      <h2 className="text-4xl sm:text-6xl font-extrabold text-white flex justify-center items-center relative z-10">
        <FiUsers size={48} className="me-2" />
        {userCount !== null ? `${userCount.toLocaleString()}+` : t('stats.loading')}
      </h2>
      <p className="text-white text-sm mb-3 mt-2 px-9 relative z-10">
        {t('stats.trusted')}
      </p>

      <div className="bg-gray-50 text-gray-700 font-medium text-sm px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 shadow-inner relative z-10">
        <FiTrendingUp className="text-[#c41e2e]" />
        {t('stats.trustedBadge')} <span className="font-semibold text-[#c41e2e]">{t('stats.manyClients')}</span>
      </div>
    </div>
  );
}
