"use client"

import { useState } from "react"
import { PokemonDetails } from "@/components/pokemon-details"
import { PokemonSidebar } from "@/components/pokemon-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { pokemonData } from "@/lib/pokemon-data"

export default function PokemonExplorer() {
  const [selectedPokemon, setSelectedPokemon] = useState(pokemonData[0])

  return (
    <SidebarProvider>
      <PokemonSidebar
        pokemonList={pokemonData}
        onSelectPokemon={setSelectedPokemon}
        selectedPokemon={selectedPokemon}
      />
      <SidebarInset className="bg-background">
        <PokemonDetails pokemon={selectedPokemon} />
      </SidebarInset>
    </SidebarProvider>
  )
}
