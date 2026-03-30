import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://getfairclaimpro.com'),
  title: {
    default: "WorkerRight — Know Your Rights. Get What You're Owed.",
    template: '%s | WorkerRight',
  },
  description:
    "Free workers' comp, wrongful termination, and gig worker rights calculators for all 47 US states. State-specific estimates in 2 minutes. Reviewed by licensed attorneys.",
  openGraph: {
    siteName: 'WorkerRight',
    title: "WorkerRight — Know Your Rights. Get What You're Owed.",
    description:
      "Free state-specific calculators for workers' comp and wrongful termination claims.",
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'WorkerRight — Workers Comp Settlement Calculator',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen bg-white text-gray-900`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
