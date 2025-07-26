"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PokemonSelectorProps {
  side: "left" | "right"
  currentPokemon?: string
  otherPokemon?: string
}

export function PokemonSelector({ side, currentPokemon, otherPokemon }: PokemonSelectorProps) {
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSelect = async () => {
    if (!searchValue.trim()) return

    setIsLoading(true)
    const newPokemon = searchValue.toLowerCase().trim()

    try {
      if (side === "left") {
        // Update left Pokemon
        if (otherPokemon) {
          router.push(`/compare/${newPokemon}/${otherPokemon}`)
        } else {
          router.push(`/compare/${newPokemon}`)
        }
      } else {
        // Update right Pokemon  
        if (currentPokemon) {
          router.push(`/compare/${currentPokemon}/${newPokemon}`)
        } else {
          router.push(`/compare/${newPokemon}`)
        }
      }
    } catch (error) {
      console.error("Navigation error:", error)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSelect()
    }
  }

  const sideColor = side === "left" ? "blue" : "red"

  return (
    <div className="bg-white rounded-lg p-4 border shadow-sm">
      <h4 className={`text-sm font-medium text-${sideColor}-700 mb-2`}>
        {side === "left" ? "Change Left Pokémon" : "Change Right Pokémon"}
      </h4>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Enter Pokémon name..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleSelect}
          disabled={!searchValue.trim() || isLoading}
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
          Currently: {currentPokemon}
        </p>
      )}
    </div>
  )
}
