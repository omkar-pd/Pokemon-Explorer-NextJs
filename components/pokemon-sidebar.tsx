"use client"

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
import { Search, Loader2, Zap } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect } from "react"
import { usePokemonList } from "@/hooks/use-pokemon-list"

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
}

export function PokemonSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [pokemonList, setPokemonList] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 50

  // Use shared Pokemon list
  const { pokemon: allPokemon, loading: pokemonLoading } = usePokemonList()

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setPokemonList(filtered)
    } else {
      setPokemonList(allPokemon.slice(0, page * itemsPerPage))
    }
  }, [searchQuery, allPokemon, page])

  const loadMore = async () => {
    if (!searchQuery) {
      const nextItems = allPokemon.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
      setPokemonList((prev) => [...prev, ...nextItems])
      setPage((prev) => prev + 1)
    }
  }

  if (pokemonLoading) {
    return (
      <Sidebar className="border-r-2 border-border/50">
        <SidebarHeader className="bg-gradient-to-r from-red-500 to-blue-500 text-white p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <Link href='/'>
                <h2 className="text-base md:text-lg font-bold">Pokédex</h2>
              </Link>
            </div>
            <SidebarTrigger className="text-white hover:bg-white/20 md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground px-4">
            <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" />
            <span className="text-sm md:text-base text-center">Loading Pokémon...</span>
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    )
  }

  return (
    <Sidebar className="border-r-2 border-border/50">
      <SidebarHeader className="bg-gradient-to-r from-red-500 to-blue-500 text-white p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <Link href='/' className="min-w-0">
              <h2 className="text-base md:text-lg font-bold truncate">Pokédex</h2>
            </Link>
          </div>
          <SidebarTrigger className="text-white hover:bg-white/20 md:hidden flex-shrink-0" />
        </div>
        
        {/* Search Input - Responsive */}
        <div className="relative mt-2 md:mt-3">
          <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-white/70" />
          <Input
            placeholder="Search Pokémon..."
            className="pl-8 md:pl-10 h-8 md:h-10 text-xs md:text-sm bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Results Counter - Responsive */}
        {pokemonList.length > 0 && (
          <div className="text-[10px] md:text-xs text-white/80 mt-1 md:mt-2">
            {searchQuery
              ? `Found ${pokemonList.length} Pokémon`
              : `${pokemonList.length} of ${allPokemon.length} Pokémon`}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent
        className="h-[calc(100vh-140px)] md:h-[calc(100vh-200px)] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100"
        id="sidebar-content"
      >
        <InfiniteScroll
          dataLength={pokemonList.length}
          next={loadMore}
          hasMore={!searchQuery && pokemonList.length < allPokemon.length}
          loader={
            <div className="flex flex-col md:flex-row items-center justify-center p-3 md:p-6 gap-2">
              <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin text-primary" />
              <span className="text-xs md:text-sm font-medium text-muted-foreground text-center">
                Loading more Pokémon...
              </span>
            </div>
          }
          scrollableTarget="sidebar-content"
          scrollThreshold="100%"
          endMessage={
            <div className="text-center p-3 md:p-4 text-[10px] md:text-xs text-muted-foreground border-t">
              🎉 All Pokémon loaded!
            </div>
          }
        >
          <SidebarMenu className="p-1 md:p-2 space-y-0.5 md:space-y-1">
            {pokemonList.map((pokemon, index) => (
              <SidebarMenuItem key={pokemon.name}>
                <SidebarMenuButton className="group hover:bg-white hover:shadow-md transition-all duration-200 rounded-md md:rounded-lg p-2 md:p-3 h-auto">
                  <Link href={`/pokemon/${pokemon.name.toLowerCase()}`} className="w-full">
                    <div className="flex items-center gap-2 md:gap-3 w-full">
                      {/* Pokemon ID Badge - Responsive */}
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/20 md:border-2 group-hover:border-primary/40 transition-colors">
                          <span className="text-[9px] md:text-xs font-bold text-primary">
                            #{pokemon.id?.toString().padStart(3, "0") || (index + 1).toString().padStart(3, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Pokemon Info - Responsive */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs md:text-sm capitalize truncate group-hover:text-primary transition-colors">
                            {pokemon.name}
                          </span>
                        </div>

                        {/* Pokemon Types - Responsive */}
                        {pokemon.types && (
                          <div className="flex gap-0.5 md:gap-1 mt-0.5 md:mt-1">
                            {pokemon.types.slice(0, 2).map((type, typeIndex) => (
                              <Badge
                                key={typeIndex}
                                className={`text-[8px] md:text-[10px] px-1 md:px-1.5 py-0.5 text-white font-medium ${typeColors[type.type?.name || type] || "bg-gray-400"
                                  }`}
                              >
                                {/* Show full type name on desktop, first letter on mobile */}
                                <span className="hidden md:inline">
                                  {(type.type?.name || type)}
                                </span>
                                <span className="md:hidden">
                                  {(type.type?.name || type).charAt(0).toUpperCase()}
                                </span>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hover Arrow - Hidden on mobile for space */}
                      <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-primary/60 rotate-[-45deg]"></div>
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </InfiniteScroll>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
