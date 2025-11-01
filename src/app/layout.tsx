import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageTransition } from "@/components/ui/animations";
import { SkipLink } from "@/components/ui/skip-link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bhagavad Gita - Sacred Text & Wisdom",
    template: "%s | Bhagavad Gita"
  },
  description: "Complete Bhagavad Gita with Sanskrit verses, English translations, word-by-word meanings, and spiritual commentary. Explore all 18 chapters and 700+ verses of this sacred Hindu scripture.",
  keywords: [
    "Bhagavad Gita",
    "Sanskrit",
    "Hindu scripture",
    "Krishna",
    "Arjuna",
    "spiritual wisdom",
    "yoga",
    "dharma",
    "moksha",
    "Hinduism",
    "sacred text",
    "philosophy",
    "meditation",
    "spiritual growth"
  ],
  authors: [{ name: "Bhagavad Gita Wisdom" }],
  creator: "Bhagavad Gita Wisdom",
  publisher: "Bhagavad Gita Wisdom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagavad-gita.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Bhagavad Gita - Sacred Text & Wisdom',
    description: 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
    siteName: 'Bhagavad Gita Wisdom',
    images: [
      {
        url: '/favicon.jpg',
        width: 1200,
        height: 630,
        alt: 'Bhagavad Gita - Sacred Text & Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhagavad Gita - Sacred Text & Wisdom',
    description: 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
    images: ['/favicon.jpg'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notosansdevanagari/v25/TuGKUUVrRomTS2TjqwC-JC7DWkDhVxOxYqx6QdZPnQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body 
        className="font-body antialiased bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen"
        suppressHydrationWarning={true}
      >
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <div className="relative">
          <Header />
          <PageTransition>
            <main id="main-content" role="main">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
