import { Inter, Dancing_Script } from 'next/font/google';
import '../index.css';
import { personalInfo } from '@/data/portfolio';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-dancing-script',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tafsirchy.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tafsir Chowdhury — Full-Stack Engineer & Founder',
    template: '%s | Tafsir Chowdhury',
  },
  description:
    'Tafsir Chowdhury — Full-Stack Web Developer & Founder of BOONEC. Building performant web applications, scalable SaaS architectures, and thoughtful digital products with React, Next.js, and Node.js.',
  keywords: [
    'Tafsir Chowdhury',
    'Full-Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js',
    'MERN Stack',
    'BOONEC',
    'Web Developer Bangladesh',
    'Portfolio',
  ],
  authors: [{ name: 'Tafsir Chowdhury', url: siteUrl }],
  creator: 'Tafsir Chowdhury',
  publisher: 'Tafsir Chowdhury',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Tafsir Chowdhury — Full-Stack Engineer & Founder',
    description:
      'Building performant web applications, scalable SaaS architectures, and thoughtful digital products with React, Next.js, and Node.js.',
    siteName: 'Tafsir Chowdhury Portfolio',
    images: [
      {
        url: '/assets/HeroProfile.png',
        width: 1200,
        height: 630,
        alt: 'Tafsir Chowdhury — Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tafsir Chowdhury — Full-Stack Engineer & Founder',
    description:
      'Building performant web applications, scalable SaaS architectures, and thoughtful digital products with React, Next.js, and Node.js.',
    creator: '@chy_tafsir',
    images: ['/assets/HeroProfile.png'],
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
  icons: {
    icon: '/vite.svg',
    shortcut: '/vite.svg',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.tagline,
    description: personalInfo.bio,
    url: siteUrl,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location,
      addressCountry: 'Bangladesh',
    },
    sameAs: [
      'https://github.com/Tafsirchy',
      'https://www.linkedin.com/in/tafsirchy/',
      'https://x.com/chy_tafsir',
      'https://www.facebook.com/tafsir.chowdhury.973567',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'Full-Stack Web Development',
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${dancingScript.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#FAF9F6] dark:bg-[#0F1117] text-[#181A20] dark:text-[#F3F4F6] selection:bg-[#4F46E5] selection:text-white min-h-screen relative overflow-x-hidden transition-colors duration-200">
        {/* Soft Ambient Warmth Atmosphere */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-gradient-to-br from-[#E06D53]/08 dark:from-[#F59E0B]/08 to-[#FAF9F6]/0 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] bg-gradient-to-br from-[#4F46E5]/08 dark:from-[#6366F1]/08 to-[#FAF9F6]/0 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-[#E06D53]/06 via-[#4F46E5]/05 to-[#FAF9F6]/0 rounded-full blur-3xl" />
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-3 focus:bg-[#4F46E5] focus:text-white focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest rounded-lg shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
