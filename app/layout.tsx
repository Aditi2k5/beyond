import './globals.css'
import { Abril_Fatface, Edu_VIC_WA_NT_Beginner, Inter } from 'next/font/google'

const abril = Abril_Fatface({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abril',
  display: 'swap',
})

const eduAustralia = Edu_VIC_WA_NT_Beginner({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-edu-australia',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Beyond Broken Brains',
  description: 'Empowering minds, one brain at a time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${abril.variable} ${eduAustralia.variable} ${inter.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}

