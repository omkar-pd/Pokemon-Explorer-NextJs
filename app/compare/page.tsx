"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

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
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Compare Pokémon</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 border max-w-4xl mx-auto w-full">
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
      </div>
    </SidebarInset>
  )
}
