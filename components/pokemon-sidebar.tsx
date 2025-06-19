"use client"

import type { Pokemon } from "@/lib/pokemon-data"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PokemonSidebarProps {
  pokemonList: Pokemon[]
}

export function PokemonSidebar({ pokemonList }: PokemonSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Pokédex</h2>
          <SidebarTrigger />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Pokémon..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredPokemon.map((pokemon) => (
            <SidebarMenuItem key={pokemon.id}>
              <SidebarMenuButton>
                <Link href={`/pokemon/${pokemon.name.toLowerCase()}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xs font-medium text-primary">{pokemon.id}</span>
                    </div>
                    <span>{pokemon.name}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
