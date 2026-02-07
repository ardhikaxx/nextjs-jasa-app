import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mumet.in | Jasa Website, Aplikasi, AI, IoT & UI/UX',
  description:
    'Bangun produk digital yang rapi dan cepat. Website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses jelas, harga transparan, siap scale.',
  openGraph: {
    title: 'Mumet.in | Jasa Website, Aplikasi, AI, IoT & UI/UX',
    description:
      'Bangun produk digital yang rapi dan cepat. Website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses jelas, harga transparan, siap scale.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumet.in | Jasa Website, Aplikasi, AI, IoT & UI/UX',
    description:
      'Bangun produk digital yang rapi dan cepat. Website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses jelas, harga transparan, siap scale.',
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
