import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PromAuto — Автоматичне оновлення знижок Prom.ua',
  description:
    'Автоматизуйте щоденне оновлення знижок о 23:50. Максимізуйте CTR та продажі поки ви спите.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${inter.variable} ${jetbrainsMono.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
