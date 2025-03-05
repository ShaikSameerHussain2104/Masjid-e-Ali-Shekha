import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Masjid-e-Ali-Shekha',
  description: 'Created with ❤️by Sameer',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
