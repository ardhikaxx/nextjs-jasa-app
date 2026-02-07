import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Kata Sandi | Mumet.in',
  description:
    'Atur ulang kata sandi akun Mumet.in Anda dengan aman agar bisa melanjutkan konsultasi.',
  openGraph: {
    title: 'Reset Kata Sandi | Mumet.in',
    description:
      'Atur ulang kata sandi akun Mumet.in Anda dengan aman agar bisa melanjutkan konsultasi.',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset Kata Sandi | Mumet.in',
    description:
      'Atur ulang kata sandi akun Mumet.in Anda dengan aman agar bisa melanjutkan konsultasi.',
  },
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
