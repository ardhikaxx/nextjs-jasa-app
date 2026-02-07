import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lupa Kata Sandi | Mumet.in',
  description:
    'Pulihkan akses akun Mumet.in dengan cepat. Kami kirim link reset kata sandi ke email Anda.',
  openGraph: {
    title: 'Lupa Kata Sandi | Mumet.in',
    description:
      'Pulihkan akses akun Mumet.in dengan cepat. Kami kirim link reset kata sandi ke email Anda.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lupa Kata Sandi | Mumet.in',
    description:
      'Pulihkan akses akun Mumet.in dengan cepat. Kami kirim link reset kata sandi ke email Anda.',
  },
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
