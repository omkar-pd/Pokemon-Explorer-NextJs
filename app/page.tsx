"use client"

import { HeroBanner } from "@/components/hero-banner"
import { PopularPokemon } from "@/components/popular-pokemon"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarInset>
      {/* Mobile header with hamburger */}
      <div className="flex items-center gap-4 p-4 md:hidden border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <SidebarTrigger />
        <h1 className="text-lg font-bold text-gray-900">Pokemon Explorer</h1>
      </div>
      
      <HeroBanner />
      <PopularPokemon />
    </SidebarInset>
  )
}
