import type { Metadata } from 'next'
import './globals.css'

// ✅ Metadata block: rendered into the HTML <head>
export const metadata: Metadata = {
  metadataBase: new URL('https://www.business-studio-ai.online'),
  title: 'BusinessStudio AI – AI tools for Mauritian entrepreneurs',
  description:
    'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
  openGraph: {
    type: 'website',
    url: 'https://www.business-studio-ai.online/',
    siteName: 'BusinessStudio AI',
    title: 'BusinessStudio AI',
    description:
      'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
    images: [
      {
        url: 'https://www.business-studio-ai.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BusinessStudio AI',
    description:
      'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
    images: [
      'https://www.business-studio-ai.online/images/og-image.png',
    ],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}