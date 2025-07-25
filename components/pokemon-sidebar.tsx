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
import { getAllPokemon } from "@/lib/pokemon-utils"

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
  const [allPokemon, setAllPokemon] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 50

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getAllPokemon()
      setAllPokemon(data)
      setPokemonList(data.slice(0, itemsPerPage))
    }
    fetchPokemon()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <Sidebar className="border-r-2 border-border/50">
      <SidebarHeader className="bg-gradient-to-r from-red-500 to-blue-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <Link href='/'><h2 className="text-lg font-bold">Pokédex</h2></Link>
          </div>
          <SidebarTrigger className="text-white hover:bg-white/20" />
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search Pokémon..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {pokemonList.length > 0 && (
          <div className="text-xs text-white/80 mt-2">
            {searchQuery
              ? `Found ${pokemonList.length} Pokémon`
              : `${pokemonList.length} of ${allPokemon.length} Pokémon`}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent
        className="h-[calc(100vh-200px)] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100"
        id="sidebar-content"
      >
        <InfiniteScroll
          dataLength={pokemonList.length}
          next={loadMore}
          hasMore={!searchQuery && pokemonList.length < allPokemon.length}
          loader={
            <div className="flex items-center justify-center p-6 gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Loading more Pokémon...</span>
            </div>
          }
          scrollableTarget="sidebar-content"
          scrollThreshold="100%"
          endMessage={
            <div className="text-center p-4 text-xs text-muted-foreground border-t">🎉 All Pokémon loaded!</div>
          }
        >
          <SidebarMenu className="p-2 space-y-1">
            {pokemonList.map((pokemon, index) => (
              <SidebarMenuItem key={pokemon.name}>
                <SidebarMenuButton className="group hover:bg-white hover:shadow-md transition-all duration-200 rounded-lg p-3 h-auto">
                  <Link href={`/pokemon/${pokemon.name.toLowerCase()}`} className="w-full">
                    <div className="flex items-center gap-3 w-full">
                      {/* Pokemon ID Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                          <span className="text-xs font-bold text-primary">
                            #{pokemon.id?.toString().padStart(3, "0") || index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Pokemon Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm capitalize truncate group-hover:text-primary transition-colors">
                            {pokemon.name}
                          </span>
                        </div>

                        {/* Pokemon Types */}
                        {pokemon.types && (
                          <div className="flex gap-1 mt-1">
                            {pokemon.types.slice(0, 2).map((type, typeIndex) => (
                              <Badge
                                key={typeIndex}
                                className={`text-[10px] px-1.5 py-0.5 text-white font-medium ${typeColors[type.type?.name || type] || "bg-gray-400"
                                  }`}
                              >
                                {(type.type?.name || type).charAt(0).toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hover Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
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
