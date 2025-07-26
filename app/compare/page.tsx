"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ComparePage() {
  const [leftSearch, setLeftSearch] = useState("")
  const [rightSearch, setRightSearch] = useState("")
  const router = useRouter()

  const handleCompare = () => {
    if (leftSearch && rightSearch) {
      router.push(`/compare/${leftSearch.toLowerCase()}/${rightSearch.toLowerCase()}`)
    } else if (leftSearch) {
      router.push(`/compare/${leftSearch.toLowerCase()}`)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Compare</h2>
        <p className="text-gray-600">Enter two Pokémon names to compare them</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Pokemon Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700">Pokémon A</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="e.g., Pikachu"
              className="pl-10"
              value={leftSearch}
              onChange={(e) => setLeftSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
            />
          </div>
        </div>

        {/* Right Pokemon Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-red-700">Pokémon B</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="e.g., Charizard"
              className="pl-10"
              value={rightSearch}
              onChange={(e) => setRightSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleCompare}
          disabled={!leftSearch && !rightSearch}
          className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
        >
          Compare Pokémon
        </Button>
      </div>
    </div>
  )
}
