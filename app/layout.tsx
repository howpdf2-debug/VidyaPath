import './globals.css'                          // ✅ Sirf ek baar
import type { Metadata, Viewport } from 'next' // ✅ Viewport type add kiya
import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({ subsets: ['latin'] })

// ✅ FIX 1: Viewport alag export — Next.js 14+ ka sahi tarika
// Bina iske mobile par layout zoom/broken rehta hai
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#312e81' },
  ],
}

// ✅ FIX 2: metadata — proper structure with verification + OG
export const metadata: Metadata = {
  // OG + canonical URLs ke liye base URL (required)
  metadataBase: new URL('https://vidyapath.bhaihelp.in'),

  title: 'VidyaPath — Free NCERT, CBSE, Sarkari Naukri | India ka Study Portal',
  description:
    'Free NCERT solutions, CBSE sample papers, state board resources, government job alerts, and study tools for Indian students. 100% free, Hindi + English.',

  // ✅ FIX 3: google-site-verification ka sahi tarika (meta tag nahi chahiye ab)
  verification: {
    google: '115l3tNyRiX3r1IlsP732O7joUZQ2Ia4fWxtF-SW21o',
  },

  // Basic OpenGraph (sharing ke liye)
  openGraph: {
    type: 'website',
    siteName: 'VidyaPath',
    locale: 'hi_IN',
    title: 'VidyaPath — Free NCERT, CBSE, Sarkari Naukri',
    description:
      'Free NCERT solutions, CBSE sample papers, state board resources, government job alerts for Indian students.',
    url: 'https://vidyapath.bhaihelp.in',
  },

  // Twitter card
  twitter: {
    card: 'summary_large_image',
    title: 'VidyaPath — India ka Free Study Portal',
    description: 'Free NCERT, CBSE, Sarkari Naukri — Indian students ke liye.',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // ✅ FIX 4: suppressHydrationWarning — dark mode class toggle ke liye zaroori
    // ✅ FIX 5: lang="hi-IN" — more accurate locale
    <html lang="hi-IN" suppressHydrationWarning>
      {/*
        ✅ FIX 6: Manual <head> tag HATAO — App Router mein forbidden hai
        Next.js khud <head> manage karta hai metadata export se.
        Manual <head> se hydration errors aur duplicate tags aate hain.
      */}
      <body className={dmSans.className}>

        {/* ✅ FIX 7: Scripts body mein hone chahiye, head mein nahi
            afterInteractive strategy ke saath body mein dalna correct hai */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TQSV7ZEW3T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQSV7ZEW3T');
          `}
        </Script>

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />

      </body>
    </html>
  )
}