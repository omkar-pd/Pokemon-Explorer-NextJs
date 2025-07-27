"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { usePokemonList } from "@/hooks/use-pokemon-list"

interface Pokemon {
  name: string
  url: string
}

interface PokemonSelectorProps {
  side: "left" | "right"
  currentPokemon?: string
  otherPokemon?: string
  // Optional props for standalone use (like in /compare page)
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function PokemonSelector({ 
  side, 
  currentPokemon = "", 
  otherPokemon = "",
  value,
  onChange,
  placeholder
}: PokemonSelectorProps) {
  const [searchValue, setSearchValue] = useState("")
  const [suggestions, setSuggestions] = useState<Pokemon[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Use the existing Pokemon list hook
  const { pokemon: pokemonList, loading } = usePokemonList()

  // Determine if this is used in navigation mode or value/onChange mode
  const isNavigationMode = !onChange
  const displayValue = isNavigationMode ? currentPokemon : (value || "")

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setSearchValue(displayValue)
    }
  }, [displayValue, mounted])

  useEffect(() => {
    if (!loading && pokemonList.length > 0 && mounted) {
      if (searchValue.trim()) {
        const filtered = pokemonList
          .filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 8)
        setSuggestions(filtered)
        if (isTyping) {
          setShowSuggestions(filtered.length > 0)
        }
      } else {
        setSuggestions(pokemonList.slice(0, 8))
        if (isTyping) {
          setShowSuggestions(true)
        }
      }
      setSelectedIndex(-1)
    }
  }, [searchValue, pokemonList, loading, isTyping, mounted])

  const handlePokemonChange = (newPokemon: string) => {
    if (!newPokemon.trim() || !mounted) return

    if (isNavigationMode) {
      // Navigation mode - update URL
      let newUrl = "/compare/"
      
      if (side === "left") {
        newUrl += newPokemon.toLowerCase()
        if (otherPokemon) {
          newUrl += `/${otherPokemon.toLowerCase()}`
        }
      } else {
        if (otherPokemon) {
          newUrl += `${otherPokemon.toLowerCase()}/${newPokemon.toLowerCase()}`
        } else {
          newUrl += newPokemon.toLowerCase()
        }
      }

      router.push(newUrl)
    } else {
      // Value/onChange mode - call parent handler
      onChange?.(newPokemon)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return
    const newValue = e.target.value
    setSearchValue(newValue)
    setIsTyping(true)
    setShowSuggestions(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!mounted) return

    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (searchValue.trim()) {
          handlePokemonChange(searchValue.trim())
          setIsTyping(false)
          setShowSuggestions(false)
        }
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handlePokemonChange(suggestions[selectedIndex].name)
        } else if (searchValue.trim()) {
          handlePokemonChange(searchValue.trim())
        }
        setIsTyping(false)
        setShowSuggestions(false)
        break
      case 'Escape':
        e.preventDefault()
        setShowSuggestions(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputFocus = () => {
    if (!loading && pokemonList.length > 0 && mounted) {
      setIsTyping(true)
      if (searchValue.trim()) {
        const filtered = pokemonList
          .filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 8)
        setSuggestions(filtered)
        setShowSuggestions(filtered.length > 0)
      } else {
        setSuggestions(pokemonList.slice(0, 8))
        setShowSuggestions(true)
      }
    }
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    if (!mounted) return
    if (suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      return
    }

    setTimeout(() => {
      setIsTyping(false)
      setShowSuggestions(false)
    }, 150)
  }

  const handleSuggestionClick = (pokemon: Pokemon) => {
    if (!mounted) return
    handlePokemonChange(pokemon.name)
    setSearchValue(pokemon.name)
    setIsTyping(false)
    setShowSuggestions(false)
  }

  if (!mounted) {
    return (
      <div>
      <div className={`bg-gradient-to-br ${side === "left" ? "from-blue-50 to-blue-100" : "from-red-50 to-red-100"} p-4 rounded-xl border-2 ${side === "left" ? "border-blue-200" : "border-red-200"}`}>
        <div className="flex items-center gap-2 mb-3"></div>
          <div className={`w-3 h-3 rounded-full ${side === "left" ? "bg-blue-500" : "bg-red-500"}`}></div>
          <h3 className={`font-semibold ${side === "left" ? "text-blue-800" : "text-red-800"}`}>
            {side === "left" ? "First Pokémon" : "Second Pokémon"}
          </h3>
        </div>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  const sideColor = side === "left" ? "blue" : "red"
  const inputPlaceholder = placeholder || (side === "left" 
    ? "Search for first Pokémon..." 
    : "Search for second Pokémon...")

  return (
    <div className={`bg-gradient-to-br ${side === "left" ? "from-blue-50 to-blue-100" : "from-red-50 to-red-100"} p-4 rounded-xl border-2 ${side === "left" ? "border-blue-200" : "border-red-200"}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-3 h-3 rounded-full ${side === "left" ? "bg-blue-500" : "bg-red-500"}`}></div>
        <h3 className={`font-semibold ${side === "left" ? "text-blue-800" : "text-red-800"}`}>
          {side === "left" ? "First Pokémon" : "Second Pokémon"}
        </h3>
      </div>
      
      <div className="relative">
        <div className={`absolute -inset-1 bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-600 to-purple-600' : 'from-red-600 to-pink-600'} rounded-xl blur opacity-20 transition duration-300`}></div>
        <div className="relative bg-white rounded-lg border-2 border-gray-100 focus-within:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-500 to-purple-500' : 'from-red-500 to-pink-500'} flex items-center justify-center z-10`}>
            <Search className="h-3 w-3 text-white" />
          </div>
          <Input
            ref={inputRef}
            placeholder={loading ? "Loading Pokémon..." : inputPlaceholder}
            className="pl-12 pr-10 h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            disabled={loading}
            autoComplete="off"
          />

          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && !loading && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto backdrop-blur-sm"
            >
              {suggestions.map((pokemon, index) => (
                <div
                  key={pokemon.name}
                  className={`px-4 py-3 cursor-pointer transition-all duration-150 flex items-center gap-3 ${
                    index === selectedIndex
                      ? `bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-50 to-purple-50 border-l-4 border-blue-500' : 'from-red-50 to-pink-50 border-l-4 border-red-500'}`
                      : 'hover:bg-gray-50'
                  } ${index === 0 ? 'rounded-t-xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
                  onClick={() => handleSuggestionClick(pokemon)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-400 to-purple-400' : 'from-red-400 to-pink-400'} shadow-sm`}></div>
                  <span className="capitalize font-medium text-gray-800 flex-1">
                    {pokemon.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {displayValue && !isTyping && (
          <div className={`mt-2 flex items-center gap-2 text-sm font-medium ${sideColor === 'blue' ? 'text-blue-700' : 'text-red-700'}`}>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-500 to-purple-500' : 'from-red-500 to-pink-500'}`}></div>
            <span className="capitalize">{displayValue}</span>
            <span className="text-green-500">✓</span>
          </div>
        )}
      </div>
    </div>
  )
}
