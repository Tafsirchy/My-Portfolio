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
        url: '/assets/About.png',
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
    images: ['/assets/About.png'],
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
    <html lang="en" className={`${inter.variable} ${dancingScript.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#FFFFFF] text-zinc-900 selection:bg-zinc-900 selection:text-[#FFFFFF] min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-3 focus:bg-zinc-900 focus:text-[#FFFFFF] focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
