import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import LanguageToggleGate from "@/components/LanguageToggleGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Mumet.in - Jasa Pembuatan Website, Aplikasi, AI, IoT & UI/UX',
    template: '%s | Mumet.in - Jasa Digital Cepat & Terpercaya'
  },
  description: 'Butuh tim digital yang cepat dan rapi? Kami bantu Website, Aplikasi Mobile, AI/Machine Learning, IoT, dan UI/UX dari ide sampai launching. Konsultasi gratis, proses jelas, hasil siap bisnis.',
  keywords: [
    'jasa pembuatan website',
    'jasa buat website murah',
    'pembuatan aplikasi mobile',
    'developer aplikasi android ios',
    'sistem IoT',
    'internet of things',
    'jasa machine learning',
    'jasa ai indonesia',
    'pembuatan sistem ai',
    'jasa data science',
    'jasa chatbot',
    'pembuatan dashboard',
    'pembuatan sistem informasi',
    'jasa software house',
    'jasa pembuatan aplikasi',
    'pembuatan web aplikasi',
    'jasa landing page',
    'jasa website bisnis',
    'jasa website UMKM',
    'pembuatan toko online',
    'jasa aplikasi kasir',
    'jasa pembuatan ERP',
    'jasa integrasi API',
    'jasa maintenance website',
    'jasa aplikasi startup',
    'jasa website startup',
    'jasa aplikasi perusahaan',
    'jasa website perusahaan',
    'jasa website instansi',
    'jasa sistem informasi',
    'jasa pembuatan dashboard',
    'jasa pembuatan aplikasi web',
    'jasa pembuatan portal',
    'jasa otomasi bisnis',
    'jasa digitalisasi bisnis',
    'jasa konsultasi IT',
    'jasa pengembangan software',
    'jasa aplikasi internal',
    'jasa sistem manajemen',
    'jasa website jawa timur',
    'jasa pembuatan website jawa timur',
    'jasa pembuatan aplikasi jawa timur',
    'jasa aplikasi mobile jawa timur',
    'jasa software house jawa timur',
    'jasa website surabaya',
    'jasa pembuatan website surabaya',
    'jasa aplikasi surabaya',
    'jasa website malang',
    'jasa pembuatan website malang',
    'jasa aplikasi malang',
    'jasa website jember',
    'jasa pembuatan website jember',
    'jasa aplikasi jember',
    'jasa website sidoarjo',
    'jasa pembuatan website sidoarjo',
    'jasa aplikasi sidoarjo',
    'jasa website kediri',
    'jasa pembuatan website kediri',
    'jasa aplikasi kediri',
    'jasa website banyuwangi',
    'jasa pembuatan website banyuwangi',
    'jasa aplikasi banyuwangi',
    'jasa website gresik',
    'jasa pembuatan website gresik',
    'jasa aplikasi gresik',
    'jasa website mojokerto',
    'jasa pembuatan website mojokerto',
    'jasa aplikasi mojokerto',
    'jasa website pasuruan',
    'jasa pembuatan website pasuruan',
    'jasa aplikasi pasuruan',
    'jasa website madiun',
    'jasa pembuatan website madiun',
    'jasa aplikasi madiun',
    'jasa website probolinggo',
    'jasa pembuatan website probolinggo',
    'jasa aplikasi probolinggo',
    'jasa website blitar',
    'jasa pembuatan website blitar',
    'jasa aplikasi blitar',
    'jasa website tulungagung',
    'jasa pembuatan website tulungagung',
    'jasa aplikasi tulungagung',
    'jasa website ponorogo',
    'jasa pembuatan website ponorogo',
    'jasa aplikasi ponorogo',
    'jasa website nganjuk',
    'jasa pembuatan website nganjuk',
    'jasa aplikasi nganjuk',
    'jasa website lumajang',
    'jasa pembuatan website lumajang',
    'jasa aplikasi lumajang',
    'jasa website bondowoso',
    'jasa pembuatan website bondowoso',
    'jasa aplikasi bondowoso',
    'jasa website situbondo',
    'jasa pembuatan website situbondo',
    'jasa aplikasi situbondo',
    'jasa website tuban',
    'jasa pembuatan website tuban',
    'jasa aplikasi tuban',
    'jasa website lamongan',
    'jasa pembuatan website lamongan',
    'jasa aplikasi lamongan',
    'jasa website bojonegoro',
    'jasa pembuatan website bojonegoro',
    'jasa aplikasi bojonegoro',
    'jasa website bangkalan',
    'jasa pembuatan website bangkalan',
    'jasa aplikasi bangkalan',
    'jasa website sampang',
    'jasa pembuatan website sampang',
    'jasa aplikasi sampang',
    'jasa website pamekasan',
    'jasa pembuatan website pamekasan',
    'jasa aplikasi pamekasan',
    'jasa website sumenep',
    'jasa pembuatan website sumenep',
    'jasa aplikasi sumenep',
    'jasa website ngawi',
    'jasa pembuatan website ngawi',
    'jasa aplikasi ngawi',
    'jasa website magetan',
    'jasa pembuatan website magetan',
    'jasa aplikasi magetan',
    'jasa website trenggalek',
    'jasa pembuatan website trenggalek',
    'jasa aplikasi trenggalek',
    'jasa website pacitan',
    'jasa pembuatan website pacitan',
    'jasa aplikasi pacitan',
    'jasa website batu',
    'jasa pembuatan website batu',
    'jasa aplikasi batu',
    'jasa website kota kediri',
    'jasa pembuatan website kota kediri',
    'jasa aplikasi kota kediri',
    'jasa website kota blitar',
    'jasa pembuatan website kota blitar',
    'jasa aplikasi kota blitar',
    'jasa website kota malang',
    'jasa pembuatan website kota malang',
    'jasa aplikasi kota malang',
    'jasa website kota mojokerto',
    'jasa pembuatan website kota mojokerto',
    'jasa aplikasi kota mojokerto',
    'jasa website kota pasuruan',
    'jasa pembuatan website kota pasuruan',
    'jasa aplikasi kota pasuruan',
    'jasa website kota probolinggo',
    'jasa pembuatan website kota probolinggo',
    'jasa aplikasi kota probolinggo',
    'jasa website kota madiun',
    'jasa pembuatan website kota madiun',
    'jasa aplikasi kota madiun',
    'jasa website kota surabaya',
    'jasa pembuatan website kota surabaya',
    'jasa aplikasi kota surabaya',
    'jasa website kota batu',
    'jasa pembuatan website kota batu',
    'jasa aplikasi kota batu',
    'jasa website umkm surabaya',
    'jasa toko online surabaya',
    'jasa website kuliner surabaya',
    'jasa website properti surabaya',
    'jasa website sekolah surabaya',
    'jasa website klinik surabaya',
    'jasa website umkm malang',
    'jasa toko online malang',
    'jasa website kuliner malang',
    'jasa website properti malang',
    'jasa website sekolah malang',
    'jasa website klinik malang',
    'jasa website umkm jember',
    'jasa toko online jember',
    'jasa website kuliner jember',
    'jasa website properti jember',
    'jasa website sekolah jember',
    'jasa website klinik jember',
    'jasa website umkm sidoarjo',
    'jasa toko online sidoarjo',
    'jasa website kuliner sidoarjo',
    'jasa website properti sidoarjo',
    'jasa website sekolah sidoarjo',
    'jasa website klinik sidoarjo',
    'jasa website umkm kediri',
    'jasa toko online kediri',
    'jasa website kuliner kediri',
    'jasa website properti kediri',
    'jasa website sekolah kediri',
    'jasa website klinik kediri',
    'jasa website umkm banyuwangi',
    'jasa toko online banyuwangi',
    'jasa website kuliner banyuwangi',
    'jasa website properti banyuwangi',
    'jasa website sekolah banyuwangi',
    'jasa website klinik banyuwangi',
    'jasa website umkm gresik',
    'jasa toko online gresik',
    'jasa website kuliner gresik',
    'jasa website properti gresik',
    'jasa website sekolah gresik',
    'jasa website klinik gresik',
    'jasa website umkm pasuruan',
    'jasa toko online pasuruan',
    'jasa website kuliner pasuruan',
    'jasa website properti pasuruan',
    'jasa website sekolah pasuruan',
    'jasa website klinik pasuruan',
    'jasa website umkm madiun',
    'jasa toko online madiun',
    'jasa website kuliner madiun',
    'jasa website properti madiun',
    'jasa website sekolah madiun',
    'jasa website klinik madiun',
    'jasa website umkm blitar',
    'jasa toko online blitar',
    'jasa website kuliner blitar',
    'jasa website properti blitar',
    'jasa website sekolah blitar',
    'jasa website klinik blitar',
    'jasa website umkm probolinggo',
    'jasa toko online probolinggo',
    'jasa website kuliner probolinggo',
    'jasa website properti probolinggo',
    'jasa website sekolah probolinggo',
    'jasa website klinik probolinggo',
    'jasa website umkm mojokerto',
    'jasa toko online mojokerto',
    'jasa website kuliner mojokerto',
    'jasa website properti mojokerto',
    'jasa website sekolah mojokerto',
    'jasa website klinik mojokerto',
    'jasa website umkm kediri kota',
    'jasa toko online kediri kota',
    'jasa website kuliner kediri kota',
    'jasa website properti kediri kota',
    'jasa website sekolah kediri kota',
    'jasa website klinik kediri kota',
    'jasa website umkm batu',
    'jasa toko online batu',
    'jasa website kuliner batu',
    'jasa website properti batu',
    'jasa website sekolah batu',
    'jasa website klinik batu',
    'jasa website umkm lamongan',
    'jasa toko online lamongan',
    'jasa website kuliner lamongan',
    'jasa website properti lamongan',
    'jasa website sekolah lamongan',
    'jasa website klinik lamongan',
    'jasa website umkm tuban',
    'jasa toko online tuban',
    'jasa website kuliner tuban',
    'jasa website properti tuban',
    'jasa website sekolah tuban',
    'jasa website klinik tuban',
    'jasa website umkm bojonegoro',
    'jasa toko online bojonegoro',
    'jasa website kuliner bojonegoro',
    'jasa website properti bojonegoro',
    'jasa website sekolah bojonegoro',
    'jasa website klinik bojonegoro',
    'jasa website umkm tulungagung',
    'jasa toko online tulungagung',
    'jasa website kuliner tulungagung',
    'jasa website properti tulungagung',
    'jasa website sekolah tulungagung',
    'jasa website klinik tulungagung',
    'jasa website umkm ponorogo',
    'jasa toko online ponorogo',
    'jasa website kuliner ponorogo',
    'jasa website properti ponorogo',
    'jasa website sekolah ponorogo',
    'jasa website klinik ponorogo',
    'jasa website umkm nganjuk',
    'jasa toko online nganjuk',
    'jasa website kuliner nganjuk',
    'jasa website properti nganjuk',
    'jasa website sekolah nganjuk',
    'jasa website klinik nganjuk',
    'jasa website umkm lumajang',
    'jasa toko online lumajang',
    'jasa website kuliner lumajang',
    'jasa website properti lumajang',
    'jasa website sekolah lumajang',
    'jasa website klinik lumajang',
    'jasa website umkm bondowoso',
    'jasa toko online bondowoso',
    'jasa website kuliner bondowoso',
    'jasa website properti bondowoso',
    'jasa website sekolah bondowoso',
    'jasa website klinik bondowoso',
    'jasa website umkm situbondo',
    'jasa toko online situbondo',
    'jasa website kuliner situbondo',
    'jasa website properti situbondo',
    'jasa website sekolah situbondo',
    'jasa website klinik situbondo',
    'jasa website umkm ngawi',
    'jasa toko online ngawi',
    'jasa website kuliner ngawi',
    'jasa website properti ngawi',
    'jasa website sekolah ngawi',
    'jasa website klinik ngawi',
    'jasa website umkm magetan',
    'jasa toko online magetan',
    'jasa website kuliner magetan',
    'jasa website properti magetan',
    'jasa website sekolah magetan',
    'jasa website klinik magetan',
    'jasa website umkm trenggalek',
    'jasa toko online trenggalek',
    'jasa website kuliner trenggalek',
    'jasa website properti trenggalek',
    'jasa website sekolah trenggalek',
    'jasa website klinik trenggalek',
    'jasa website umkm pacitan',
    'jasa toko online pacitan',
    'jasa website kuliner pacitan',
    'jasa website properti pacitan',
    'jasa website sekolah pacitan',
    'jasa website klinik pacitan',
    'jasa website umkm bangkalan',
    'jasa toko online bangkalan',
    'jasa website kuliner bangkalan',
    'jasa website properti bangkalan',
    'jasa website sekolah bangkalan',
    'jasa website klinik bangkalan',
    'jasa website umkm sampang',
    'jasa toko online sampang',
    'jasa website kuliner sampang',
    'jasa website properti sampang',
    'jasa website sekolah sampang',
    'jasa website klinik sampang',
    'jasa website umkm pamekasan',
    'jasa toko online pamekasan',
    'jasa website kuliner pamekasan',
    'jasa website properti pamekasan',
    'jasa website sekolah pamekasan',
    'jasa website klinik pamekasan',
    'jasa website umkm sumenep',
    'jasa toko online sumenep',
    'jasa website kuliner sumenep',
    'jasa website properti sumenep',
    'jasa website sekolah sumenep',
    'jasa website klinik sumenep',
    'jasa website rumah sakit',
    'jasa aplikasi rumah sakit',
    'jasa website travel',
    'jasa aplikasi travel',
    'jasa website event',
    'jasa aplikasi event',
    'jasa website kontraktor',
    'jasa aplikasi kontraktor',
    'jasa website pariwisata',
    'jasa aplikasi pariwisata',
    'jasa website sekolah',
    'jasa aplikasi sekolah',
    'jasa website kampus',
    'jasa aplikasi kampus',
    'jasa website koperasi',
    'jasa aplikasi koperasi',
    'jasa website klinik',
    'jasa aplikasi klinik',
    'jasa website restoran',
    'jasa aplikasi restoran',
    'jasa website rental',
    'jasa aplikasi rental',
    'jasa website ekspedisi',
    'jasa aplikasi ekspedisi',
    'jasa website logistik',
    'jasa aplikasi logistik',
    'jasa website konstruksi',
    'jasa aplikasi konstruksi',
    'jasa website manufaktur',
    'jasa aplikasi manufaktur',
    'jasa website fintech',
    'jasa aplikasi fintech',
    'jasa website edutech',
    'jasa aplikasi edutech',
    'jasa website properti',
    'jasa aplikasi properti',
    'jasa website klinik gigi',
    'jasa aplikasi klinik gigi',
    'jasa website wedding',
    'jasa aplikasi wedding',
    'jasa website fotografi',
    'jasa aplikasi fotografi',
    'jasa website tour',
    'jasa aplikasi tour',
    'jasa website salon',
    'jasa aplikasi salon',
    'jasa website bengkel',
    'jasa aplikasi bengkel',
    'jasa website gym',
    'jasa aplikasi gym',
    'jasa website marketplace',
    'jasa aplikasi marketplace',
    'jasa website apotek',
    'jasa aplikasi apotek',
    'jasa website legal',
    'jasa aplikasi legal',
    'jasa website notaris',
    'jasa aplikasi notaris',
    'jasa website asuransi',
    'jasa aplikasi asuransi',
    'jasa website hotel',
    'jasa aplikasi hotel',
    'jasa website kos',
    'jasa aplikasi kos',
    'jasa website villa',
    'jasa aplikasi villa',
    'jasa website laundry',
    'jasa aplikasi laundry',
    'jasa website event organizer',
    'jasa aplikasi event organizer',
    'jasa website wedding organizer',
    'jasa aplikasi wedding organizer',
    'jasa website tour travel',
    'jasa aplikasi tour travel',
    'konsultasi tugas akhir',
    'konsultasi skripsi',
    'mentoring project aplikasi',
    'bimbingan teknis aplikasi',
    'review konsep aplikasi',
    'review code aplikasi',
    'workshop pembuatan aplikasi',
    'pelatihan pembuatan aplikasi',
    'contoh project demo aplikasi',
    'contoh project demo website',
    'jasa website umkm surabaya',
    'jasa website travel surabaya',
    'jasa website event surabaya',
    'jasa website kontraktor surabaya',
    'jasa website rumah sakit surabaya',
    'jasa website properti surabaya',
    'jasa website umkm malang',
    'jasa website travel malang',
    'jasa website event malang',
    'jasa website kontraktor malang',
    'jasa website rumah sakit malang',
    'jasa website properti malang',
    'jasa website umkm jember',
    'jasa website travel jember',
    'jasa website event jember',
    'jasa website kontraktor jember',
    'jasa website rumah sakit jember',
    'jasa website properti jember',
    'jasa website umkm sidoarjo',
    'jasa website travel sidoarjo',
    'jasa website event sidoarjo',
    'jasa website kontraktor sidoarjo',
    'jasa website rumah sakit sidoarjo',
    'jasa website properti sidoarjo',
    'jasa website umkm kediri',
    'jasa website travel kediri',
    'jasa website event kediri',
    'jasa website kontraktor kediri',
    'jasa website rumah sakit kediri',
    'jasa website properti kediri',
    'jasa website umkm banyuwangi',
    'jasa website travel banyuwangi',
    'jasa website event banyuwangi',
    'jasa website kontraktor banyuwangi',
    'jasa website rumah sakit banyuwangi',
    'jasa website properti banyuwangi',
    'desain UI/UX',
    'jasa web development',
    'pembuatan website company profile',
    'aplikasi mobile custom',
    'iot development Indonesia',
    'ui ux design profesional',
    'jasa programmer website',
    'developer web aplikasi',
    'jasa pembuatan software'
  ].join(', '),
  other: {
    'content-language': 'id, en',
  },
  authors: [{ name: 'Mumet.in Team' }],
  creator: 'Mumet.in',
  publisher: 'Mumet.in',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://mumetin.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mumet.in - Jasa Website, Aplikasi, AI, IoT & UI/UX',
    description: 'Buat produk digital tanpa ribet. Website, Mobile App, AI, IoT, UI/UX. Konsultasi gratis, timeline jelas, hasil siap scale.',
    url: 'https://mumetin.vercel.app/',
    siteName: 'Mumet.in',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mumet.in - Jasa Layanan Digital Profesional',
      },
    ],
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumet.in - Jasa Website, Aplikasi, AI, IoT & UI/UX',
    description: 'Dari ide sampai launch. Website, Mobile App, AI, IoT, UI/UX. Konsultasi gratis, proses rapi.',
    images: ['/images/logo.png'],
    creator: '@mumet.in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'C2P7WSgl4HI1ZdlErCytdn1vx3TuYmdeDJjLjXlF5cc',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mumet.in',
  description: 'Jasa profesional pembuatan Website, Aplikasi Mobile, Sistem IoT, dan Desain UI/UX dengan harga terjangkau',
  url: 'https://jasa-app-murah.vercel.app',
  logo: 'https://jasa-app-murah.vercel.app/images/logo.png',
  telephone: '+62-859-9364-8537',
  email: 'ardhikayanuar58@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
    addressLocality: 'Jember',
    addressRegion: 'Jawa Timur'
  },
  areaServed: 'Indonesia',
  serviceType: [
    'Web Development',
    'Mobile App Development', 
    'IoT Systems Development',
    'UI/UX Design',
    'Machine Learning & AI',
    'Data Analytics',
    'System Integration',
    'Custom Software Development'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Digital Mumet.in',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pembuatan Website Profesional',
          description: 'Jasa pembuatan website responsive, SEO-friendly, dan modern untuk bisnis Anda',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Aplikasi Mobile Android & iOS',
          description: 'Pengembangan aplikasi mobile native dan hybrid untuk platform Android dan iOS',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sistem Internet of Things (IoT)',
          description: 'Pengembangan sistem IoT custom untuk smart home, industri, dan monitoring',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Desain UI/UX Modern',
          description: 'Jasa desain user interface dan user experience yang menarik dan user-friendly',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Machine Learning & AI',
          description: 'Pembuatan model AI, chatbot, rekomendasi, prediksi, dan otomatisasi berbasis data',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sistem Informasi & Dashboard',
          description: 'Pengembangan sistem informasi, dashboard analitik, dan portal internal perusahaan',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Integrasi API & Otomasi',
          description: 'Integrasi API pihak ketiga, payment gateway, dan otomasi proses bisnis',
          offers: {
            '@type': 'Offer',
            description: 'Harga menyesuaikan kebutuhan'
          }
        }
      }
    ]
  },
  sameAs: [
    'https://www.instagram.com/mumet.in/',
  ],
  priceRange: 'Harga menyesuaikan kebutuhan'
};

const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
const enableNoupeEmbed = process.env.NEXT_PUBLIC_ENABLE_NOUPE_EMBED === 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="C2P7WSgl4HI1ZdlErCytdn1vx3TuYmdeDJjLjXlF5cc" />
        
        {/* Structured Data untuk SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional Meta Tags untuk SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="language" content="id" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="copyright" content="Mumet.in" />
        <meta name="robots" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />

        {enableAnalytics && gtmId && (
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`
            }}
          />
        )}

        {enableAnalytics && gaId && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {enableAnalytics && gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
        )}
        
        <LanguageProvider>
          <LanguageToggleGate />
          {children}
        </LanguageProvider>
        {enableNoupeEmbed && (
          <Script
            id="noupe-embed"
            strategy="lazyOnload"
            src="https://www.noupe.com/embed/019b83ff69537774ab888dcf1fed2bee580e.js"
          />
        )}
      </body>
    </html>
  );
}
