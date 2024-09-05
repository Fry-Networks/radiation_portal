import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FRY Radiation Portal',
  description: 'Link your Radiation devices to your wallet and earn $FRY',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
      </head>

      <body className={inter.className}>{children}</body>
    </html>

  )
}
