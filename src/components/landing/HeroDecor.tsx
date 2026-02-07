'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CatLogo from '@/assets/images/cat.png';
import { useI18n } from '@/i18n/LanguageProvider';

const CurvedLoop = dynamic(() => import('@/components/CurvedLoop'), {
  ssr: false,
});

const StickerPeel = dynamic(() => import('@/components/StickerPeel'), {
  ssr: false,
});

export default function HeroDecor() {
  const [enableMotion, setEnableMotion] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scheduleMotionUpdate = (matches: boolean) => {
      const nextValue = !matches;
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setEnableMotion(nextValue));
      } else {
        setTimeout(() => setEnableMotion(nextValue), 300);
      }
    };

    scheduleMotionUpdate(prefersReducedMotion.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      scheduleMotionUpdate(event.matches);
    };

    prefersReducedMotion.addEventListener('change', onMotionChange);
    return () => prefersReducedMotion.removeEventListener('change', onMotionChange);
  }, []);

  if (!enableMotion) return null;

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CurvedLoop
          marqueeText={t('landing.marquee')}
          speed={3}
          curveAmount={500}
          direction="right"
          interactive={false}
          className="font-daydream custom-text-style"
        />
      </div>

      <StickerPeel
        imageSrc={CatLogo.src}
        width={150}
        rotate={0}
        peelBackHoverPct={10}
        peelBackActivePct={20}
        shadowIntensity={0.2}
        lightingIntensity={0.1}
        initialPosition={{ x: 100, y: -55 }}
        className="z-50"
      />
    </>
  );
}
