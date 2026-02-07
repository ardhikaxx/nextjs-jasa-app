import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Mumet.in',
  description:
    'Mulai konsultasi dan kirim detail proyek Anda. Pilih layanan website, aplikasi mobile, AI/ML, IoT, atau UI/UX.',
  openGraph: {
    title: 'Dashboard | Mumet.in',
    description:
      'Mulai konsultasi dan kirim detail proyek Anda. Pilih layanan website, aplikasi mobile, AI/ML, IoT, atau UI/UX.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Mumet.in',
    description:
      'Mulai konsultasi dan kirim detail proyek Anda. Pilih layanan website, aplikasi mobile, AI/ML, IoT, atau UI/UX.',
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
