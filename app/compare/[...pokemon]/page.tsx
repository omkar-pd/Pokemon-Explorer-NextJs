import { fetchPokemon } from "@/lib/pokemon-utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PokemonCompareCard } from "@/components/pokemon-compare-card"
import { PokemonSelector } from "@/components/pokemon-selector"
import { PokemonLoadingCard } from "@/components/pokemon-loading-card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Suspense } from "react"

// Create async components for each Pokemon
async function LeftPokemonCard({ pokemon }: { pokemon: string }) {
  try {
    const data = await fetchPokemon(pokemon.toLowerCase())
    return <PokemonCompareCard pokemon={data} side="left" />
  } catch (error) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-dashed border-blue-200">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">❌</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            {pokemon} Not Found
          </h3>
          <p className="text-blue-600">
            "{pokemon}" could not be found
          </p>
        </div>
      </div>
    )
  }
}

async function RightPokemonCard({ pokemon }: { pokemon: string }) {
  try {
    const data = await fetchPokemon(pokemon.toLowerCase())
    return <PokemonCompareCard pokemon={data} side="right" />
  } catch (error) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-dashed border-red-200">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">❌</span>
          </div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            {pokemon} Not Found
          </h3>
          <p className="text-red-600">
            "{pokemon}" could not be found
          </p>
        </div>
      </div>
    )
  }
}

export default async function ComparePokemonPage({
  params,
}: {
  params: Promise<{ pokemon: string[] }>
}) {
  const { pokemon } = await params
  const leftPokemon = pokemon[0]
  const rightPokemon = pokemon[1]

  if (!pokemon || pokemon.length === 0) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Compare Pokémon</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[50vh] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Comparison URL</h1>
              <p className="text-gray-600 mb-8">Please provide at least one Pokémon to compare.</p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go to Comparison Page
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
    )
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2 flex-1">
          <Link
            href="/compare"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {leftPokemon && rightPokemon
                ? `${leftPokemon} vs ${rightPokemon}`
                : leftPokemon
                  ? `${leftPokemon} - Select another`
                  : rightPokemon
                    ? `Select vs ${rightPokemon}`
                    : "Select Pokémon to compare"
              }
            </h1>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="max-w-7xl mx-auto w-full">
          {/* Pokemon Selectors */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <PokemonSelector
              side="left"
              currentPokemon={leftPokemon}
              otherPokemon={rightPokemon}
            />
            <PokemonSelector
              side="right"
              currentPokemon={rightPokemon}
              otherPokemon={leftPokemon}
            />
          </div>

          {/* Comparison Grid with Suspense */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
            {/* Left Pokemon Slot */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-blue-700 text-center">Pokémon A</h2>
              {leftPokemon ? (
                <Suspense fallback={<PokemonLoadingCard side="left" />}>
                  <LeftPokemonCard pokemon={leftPokemon} />
                </Suspense>
              ) : (
                <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-dashed border-blue-200">
                  <div className="text-center p-4 md:p-8">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl md:text-4xl">👈</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-2">
                      Select Left Pokémon
                    </h3>
                    <p className="text-sm md:text-base text-blue-600">
                      Choose a Pokémon to compare
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Pokemon Slot */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-red-700 text-center">Pokémon B</h2>
              {rightPokemon ? (
                <Suspense fallback={<PokemonLoadingCard side="right" />}>
                  <RightPokemonCard pokemon={rightPokemon} />
                </Suspense>
              ) : (
                <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-dashed border-red-200">
                  <div className="text-center p-4 md:p-8">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-red-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl md:text-4xl">👉</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-red-700 mb-2">
                      Select Right Pokémon
                    </h3>
                    <p className="text-sm md:text-base text-red-600">
                      Choose a Pokémon to compare
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
