import type { Metadata } from 'next'
import './globals.css'
import { PokemonSidebar } from '@/components/pokemon-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'Pokemon Explorer',
  description: 'Pokemon Explorer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <PokemonSidebar />
          <main className='w-full'>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
