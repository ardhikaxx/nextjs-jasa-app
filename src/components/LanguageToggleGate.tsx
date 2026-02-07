'use client';

import { usePathname } from 'next/navigation';
import LanguageToggle from '@/components/LanguageToggle';

export default function LanguageToggleGate() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith('/home')) {
    return null;
  }
  return <LanguageToggle />;
}
