import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

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
    default: 'Mumet.in - Jasa Pembuatan Website, Aplikasi Mobile, IoT & UI/UX Profesional',
    template: '%s | Mumet.in - Jasa Digital Murah & Berkualitas'
  },
  description: 'Jasa profesional pembuatan Website, Aplikasi Mobile Android & iOS, Sistem IoT, dan Desain UI/UX terbaik. Free konsultasi! Harga terjangkau dengan kualitas premium untuk bisnis Anda.',
  keywords: [
    'jasa pembuatan website',
    'jasa buat website murah',
    'pembuatan aplikasi mobile',
    'developer aplikasi android ios',
    'sistem IoT',
    'internet of things',
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
  authors: [{ name: 'Mumet.in Team' }],
  creator: 'Mumet.in',
  publisher: 'Mumet.in',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://jasa-app-murah.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mumet.in - Jasa Pembuatan Website, Mobile App, IoT & UI/UX Profesional',
    description: 'Jasa profesional pembuatan Website, Aplikasi Mobile, Sistem IoT, dan Desain UI/UX terbaik dengan harga terjangkau. Free konsultasi!',
    url: 'https://jasa-app-murah.vercel.app',
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumet.in - Jasa Pembuatan Website, Mobile App, IoT & UI/UX',
    description: 'Jasa profesional pembuatan Website, Aplikasi Mobile, Sistem IoT, dan Desain UI/UX terbaik dengan harga terjangkau.',
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
    'UI/UX Design'
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
      }
    ]
  },
  sameAs: [
    'https://www.instagram.com/mumet.in/',
  ],
  priceRange: 'Harga menyesuaikan kebutuhan'
};

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
        
        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSGR33HD');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Additional SEO Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSGR33HD"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        
        <AuthProvider>
          {children}
        </AuthProvider>
        <script src='https://www.noupe.com/embed/019b83ff69537774ab888dcf1fed2bee580e.js'></script>
      </body>
    </html>
  );
}