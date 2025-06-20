import type { Metadata } from 'next'
import './globals.css'
import { PokemonSidebar } from '@/components/pokemon-sidebar'
import { PokemonDetails } from "@/components/pokemon-details"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { pokemonData } from "@/lib/pokemon-data"
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
          <PokemonSidebar
            pokemonList={pokemonData}
          />
          <main className='w-full'>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
