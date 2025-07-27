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
import {
  Search,
  Loader2,
  Zap,
  Flame,
  Droplets,
  Leaf,
  Snowflake,
  Sword,
  Skull,
  Mountain,
  Wind,
  Brain,
  Bug,
  Gem,
  Ghost,
  Sparkles,
  Shield,
  CircleDot,
  Star
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect } from "react"
import { usePokemonList } from "@/hooks/use-pokemon-list"

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

        <div className="relative mt-2 md:mt-3">
          <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-white/70" />
          <Input
            placeholder="Search Pokémon..."
            className="pl-8 md:pl-10 h-8 md:h-10 text-xs md:text-sm bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
            {pokemonList.map((pokemon, index) => {
              const firstLetter = pokemon.name.charAt(0).toUpperCase();

              const letterColors = [
                'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
                'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500',
                'bg-orange-500', 'bg-teal-500', 'bg-lime-500', 'bg-rose-500'
              ];
              const colorIndex = firstLetter.charCodeAt(0) % letterColors.length;
              const letterColor = letterColors[colorIndex];

              return (
                <SidebarMenuItem key={pokemon.name}>
                  <SidebarMenuButton className="group hover:bg-white hover:shadow-md transition-all duration-200 rounded-md md:rounded-lg p-2 md:p-3 h-auto">
                    <Link href={`/pokemon/${pokemon.name.toLowerCase()}`} className="w-full">
                      <div className="flex items-center gap-2 md:gap-3 w-full">
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 md:w-7 md:h-7 ${letterColor} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200`}>
                            <span className="text-white font-bold text-xs md:text-sm">
                              {firstLetter}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-xs md:text-sm capitalize truncate group-hover:text-primary transition-colors">
                              {pokemon.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </InfiniteScroll>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
