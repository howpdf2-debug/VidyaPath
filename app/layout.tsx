

import './globals.css'

import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VidyaPath — Free NCERT, CBSE, Sarkari Naukri | India ka Study Portal',
  description: 'NCERT Solutions, CBSE Papers, State Boards, Sarkari Naukri — sab free, Hindi + English.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body className={dmSans.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
