import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task Master',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='bg-black text-white'>
      <body>{children}</body>
    </html>
  )
}
