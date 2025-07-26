"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePokemonList } from "@/hooks/use-pokemon-list"

interface PokemonSelectorProps {
  side: "left" | "right"
  currentPokemon?: string
  otherPokemon?: string
}

export function PokemonSelector({ side, currentPokemon, otherPokemon }: PokemonSelectorProps) {
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { pokemon: allPokemon, loading: pokemonLoading } = usePokemonList()

  useEffect(() => {
    if (searchValue.trim() && allPokemon.length > 0) {
      const filtered = allPokemon
        .filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [searchValue, allPokemon])

  const handleSelect = async (pokemonName?: string) => {
    const pokemon = pokemonName || searchValue.trim()
    if (!pokemon) return

    setIsLoading(true)
    setShowSuggestions(false)
    const newPokemon = pokemon.toLowerCase().trim()

    try {
      if (side === "left") {
        if (otherPokemon) {
          router.push(`/compare/${newPokemon}/${otherPokemon}`)
        } else {
          router.push(`/compare/${newPokemon}`)
        }
      } else {
        if (otherPokemon) {
          router.push(`/compare/${otherPokemon}/${newPokemon}`)
        } else {
          router.push(`/compare/${newPokemon}`)
        }
      }
    } catch (error) {
      console.error("Navigation error:", error)
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (pokemon: any) => {
    setSearchValue(pokemon.name)
    setShowSuggestions(false)
    handleSelect(pokemon.name)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        handleSelect()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSelect()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  const sideColor = side === "left" ? "blue" : "red"

  return (
    <div className="bg-white rounded-lg p-4 border shadow-sm">
      <h4 className={`text-sm font-medium text-${sideColor}-700 mb-2`}>
        {side === "left" ? "Change Left Pokémon" : "Change Right Pokémon"}
      </h4>
      <div className="flex gap-2 relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input
            ref={inputRef}
            placeholder={pokemonLoading ? "Loading Pokémon..." : "Enter Pokémon name..."}
            className="pl-10"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            disabled={isLoading || pokemonLoading}
            autoComplete="off"
          />

          {pokemonLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && !pokemonLoading && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            >
              {suggestions.map((pokemon, index) => (
                <div
                  key={pokemon.name}
                  className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 ${index === selectedIndex
                    ? `bg-${sideColor}-50 border-l-2 border-${sideColor}-500`
                    : 'hover:bg-gray-50'
                    }`}
                  onClick={() => handleSuggestionClick(pokemon)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`w-2 h-2 rounded-full bg-${sideColor}-400`}></div>
                  <span className="capitalize font-medium text-gray-700">
                    {pokemon.name}
                  </span>
                  <div className="ml-auto">
                    <div className="w-4 h-4 text-gray-400">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}

              {allPokemon.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase())).length > 5 && (
                <div className="px-4 py-2 text-xs text-gray-500 border-t bg-gray-50">
                  Showing 5 of {allPokemon.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase())).length} matches
                </div>
              )}
            </div>
          )}

          {/* No suggestions message */}
          {showSuggestions && suggestions.length === 0 && searchValue.trim() && !pokemonLoading && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No Pokémon found matching "{searchValue}"
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={() => handleSelect()}
          disabled={!searchValue.trim() || isLoading || pokemonLoading}
          className={`bg-${sideColor}-500 hover:bg-${sideColor}-600 min-w-[80px]`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
              Loading
            </>
          ) : (
            'Select'
          )}
        </Button>
      </div>

      {currentPokemon && (
        <p className="text-xs text-gray-500 mt-1">
          Currently: <span className="capitalize font-medium">{currentPokemon}</span>
        </p>
      )}

      {pokemonLoading && (
        <p className="text-xs text-gray-400 mt-1">
          🔄 Loading Pokémon list...
        </p>
      )}

      {!pokemonLoading && searchValue && !showSuggestions && (
        <p className="text-xs text-gray-400 mt-1">
          💡 Press Enter to search or use ↑↓ to navigate suggestions
        </p>
      )}
    </div>
  )
}
