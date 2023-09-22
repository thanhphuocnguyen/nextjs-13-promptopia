import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promtopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider >
          <Nav />
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
