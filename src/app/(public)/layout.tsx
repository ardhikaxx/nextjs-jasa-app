import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website | Mumet.in - Profesional & Terpercaya',
  description:
    'Jasa pembuatan website profesional, aplikasi mobile, IoT, dan UI/UX. Tim berpengalaman, harga transparan, siap bantu bisnis Anda naik kelas!',
  keywords: 'jasa pembuatan website, buat website, web development, jasa website jogja, jasa web, membuat aplikasi mobile, jasa aplikasi android ios, ui ux design, jasa iot, jasa ai machine learning',
  openGraph: {
    title: 'Jasa Pembuatan Website | Mumet.in - Profesional & Terpercaya',
    description:
      'Jasa pembuatan website profesional, aplikasi mobile, IoT, dan UI/UX. Tim berpengalaman, harga transparan, siap bantu bisnis Anda naik kelas!',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website | Mumet.in',
    description:
      'Jasa pembuatan website profesional, aplikasi mobile, IoT, dan UI/UX.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
