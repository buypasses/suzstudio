import type { Metadata } from 'next'
import './globals.css'
import LayoutFix from '@/components/LayoutFix'

export const metadata: Metadata = {
  title: "Suz's Studio - Videography & Live Content Capture",
  description: 'Suzzy Ndiforchu - A Los Angeles native creating in Washington, DC. Specializing in live content capture, bringing moments to life in real time.',
  keywords: ['videography', 'live content', 'DC videographer', 'event coverage', 'Instagram stories', 'TikTok content'],
  metadataBase: new URL('https://suzstudio.vercel.app'),
  openGraph: {
    title: "Suz's Studio - Home",
    description: 'Videography and Live Content Capture',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Suzzy Ndiforchu - Videography and Live Content Capture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Suz's Studio - Home",
    description: 'Videography and Live Content Capture',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <LayoutFix />
        {children}
      </body>
    </html>
  )
}
