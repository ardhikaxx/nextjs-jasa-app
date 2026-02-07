import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Mumet.in',
  description:
    'Masuk untuk mulai konsultasi dan kelola proyek website, aplikasi mobile, AI/ML, IoT, dan UI/UX secara cepat dan rapi.',
  openGraph: {
    title: 'Login | Mumet.in',
    description:
      'Masuk untuk mulai konsultasi dan kelola proyek website, aplikasi mobile, AI/ML, IoT, dan UI/UX secara cepat dan rapi.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | Mumet.in',
    description:
      'Masuk untuk mulai konsultasi dan kelola proyek website, aplikasi mobile, AI/ML, IoT, dan UI/UX secara cepat dan rapi.',
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
