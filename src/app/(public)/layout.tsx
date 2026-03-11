import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jasa Website | Aplikasi Mobile | IoT | ML | UI/UX - Mumet.in',
  description:
    'Jasa pembuatan website profesional, aplikasi mobile (Android/iOS), sistem IoT, machine learning, dan desain UI/UX. Tim berpengalaman, harga transparan, siap bantu bisnis Anda naik kelas!',
  keywords: 'jasa pembuatan website, buat website, web development, jasa website jogja, jasa web, membuat aplikasi mobile, jasa aplikasi android ios, ui ux design, jasa iot, jasa ai machine learning, jasa aplikasi mobile, jasa sistem informasi, jasa landing page, jasa toko online, jasa chatbot ai',
  openGraph: {
    title: 'Mumet.in - Jasa Website, Aplikasi Mobile, IoT, ML & UI/UX',
    description:
      'Layanan lengkap: Jasa Website, Aplikasi Mobile (Android/iOS), Sistem IoT, Machine Learning/AI, dan Desain UI/UX. Tim profesional, harga transparan, hasil siap bisnis!',
    url: 'https://mumetin.vercel.app/',
    siteName: 'Mumet.in',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mumet.in - Jasa Digital Professional',
      },
    ],
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumet.in - Jasa Website, Aplikasi Mobile, IoT, ML & UI/UX',
    description:
      'Jasa Website, Aplikasi Mobile, IoT, Machine Learning & AI, Desain UI/UX. Klik daftar, kami follow up hari ini!',
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
