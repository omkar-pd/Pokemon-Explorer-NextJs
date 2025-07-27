"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, Zap, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { usePokemonList } from "@/hooks/use-pokemon-list"

interface CustomPokemonSelectorProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  sideColor: string
  label: string
}

function CustomPokemonSelector({ placeholder, value, onChange, sideColor, label }: CustomPokemonSelectorProps) {
  const [searchValue, setSearchValue] = useState(value)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { pokemon: allPokemon, loading: pokemonLoading } = usePokemonList()

  useEffect(() => {
    if (searchValue.trim() && allPokemon.length > 0) {
      const filtered = allPokemon
        .filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 8)
      
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [searchValue, allPokemon])

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && searchValue.trim()) {
        onChange(searchValue.trim())
        setShowSuggestions(false)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % suggestions.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev <= 0 ? suggestions.length - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else if (searchValue.trim()) {
          onChange(searchValue.trim())
          setShowSuggestions(false)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSuggestionClick = (pokemon: any) => {
    onChange(pokemon.name)
    setSearchValue(pokemon.name)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    // Show suggestions immediately if there's text and matches
    if (searchValue.trim() && allPokemon.length > 0) {
      const filtered = allPokemon
        .filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 8)
      if (filtered.length > 0) {
        setSuggestions(filtered)
        setShowSuggestions(true)
      }
    }
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }, 200)
  }

  return (
    <div className="relative group">
      <div className={`absolute -inset-1 bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-600 to-purple-600' : 'from-red-600 to-pink-600'} rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
      <div className="relative bg-white rounded-lg border-2 border-gray-100 focus-within:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-500 to-purple-500' : 'from-red-500 to-pink-500'} flex items-center justify-center z-10`}>
          <Search className="h-3 w-3 text-white" />
        </div>
        <Input
          ref={inputRef}
          placeholder={pokemonLoading ? "Loading Pokémon..." : placeholder}
          className="pl-12 pr-10 h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={pokemonLoading}
          autoComplete="off"
        />

        {pokemonLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && !pokemonLoading && (
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
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-400 to-purple-400' : 'from-red-400 to-pink-400'} shadow-sm`}></div>
                <span className="capitalize font-medium text-gray-800 flex-1">
                  {pokemon.name}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Selected Pokemon Indicator */}
      {value && (
        <div className={`mt-2 flex items-center gap-2 text-sm font-medium ${sideColor === 'blue' ? 'text-blue-700' : 'text-red-700'}`}>
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sideColor === 'blue' ? 'from-blue-500 to-purple-500' : 'from-red-500 to-pink-500'}`}></div>
          <span className="capitalize">{value}</span>
          <span className="text-green-500">✓</span>
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  const [leftPokemon, setLeftPokemon] = useState("")
  const [rightPokemon, setRightPokemon] = useState("")
  const router = useRouter()

  const handleCompare = () => {
    if (leftPokemon && rightPokemon) {
      router.push(`/compare/${leftPokemon.toLowerCase()}/${rightPokemon.toLowerCase()}`)
    } else if (leftPokemon) {
      router.push(`/compare/${leftPokemon.toLowerCase()}`)
    } else if (rightPokemon) {
      router.push(`/compare/${rightPokemon.toLowerCase()}`)
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-red-50/50">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
            Compare Pokémon
          </h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-red-50/30">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Battle Comparison Tool</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Pokémon <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">Battle Arena</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your fighters and discover their strengths, weaknesses, and battle potential
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-3xl blur opacity-20"></div>

            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-6 sm:p-8 lg:p-12">
              {/* Pokemon Selection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 sm:mb-12">
                {/* Left Pokemon Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <label className="text-lg font-bold text-blue-700 block">First Fighter</label>
                      <p className="text-sm text-blue-600/80">Choose your first Pokémon</p>
                    </div>
                  </div>
                  <CustomPokemonSelector
                    placeholder="e.g., Pikachu, Charizard..."
                    value={leftPokemon}
                    onChange={setLeftPokemon}
                    sideColor="blue"
                    label="First Fighter"
                  />
                </div>

                {/* Right Pokemon Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <div>
                      <label className="text-lg font-bold text-red-700 block">Second Fighter</label>
                      <p className="text-sm text-red-600/80">Choose your second Pokémon</p>
                    </div>
                  </div>
                  <CustomPokemonSelector
                    placeholder="e.g., Blastoise, Venusaur..."
                    value={rightPokemon}
                    onChange={setRightPokemon}
                    sideColor="red"
                    label="Second Fighter"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleCompare}
                  disabled={!leftPokemon && !rightPokemon}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 text-white border-0 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    {leftPokemon && rightPokemon ? 'Start Battle!' : leftPokemon || rightPokemon ? 'Add Opponent' : 'Choose Fighters'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>

                {(leftPokemon || rightPokemon) && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>
                      {leftPokemon && rightPokemon ? 'Ready for battle!' : 'Select another Pokémon to compare'}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-1">Smart Search</h4>
                  <p className="text-sm text-blue-700">Type to find Pokémon with autocomplete</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-1">Detailed Stats</h4>
                  <p className="text-sm text-purple-700">Compare abilities, types, and stats</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-red-900 mb-1">Battle Ready</h4>
                  <p className="text-sm text-red-700">Instant comparison results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
