import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar | Mumet.in',
  description:
    'Buat akun untuk mulai proyek digital: website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses cepat, rapi, dan transparan.',
  openGraph: {
    title: 'Daftar | Mumet.in',
    description:
      'Buat akun untuk mulai proyek digital: website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses cepat, rapi, dan transparan.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar | Mumet.in',
    description:
      'Buat akun untuk mulai proyek digital: website, aplikasi mobile, AI/ML, IoT, dan UI/UX dengan proses cepat, rapi, dan transparan.',
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
