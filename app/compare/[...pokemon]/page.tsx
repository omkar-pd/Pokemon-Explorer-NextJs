import { fetchPokemon } from "@/lib/pokemon-utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PokemonCompareCard } from "@/components/pokemon-compare-card"
import { PokemonLoadingCard } from "@/components/pokemon-loading-card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Suspense } from "react"
import { PokemonSelector } from "@/components/pokemon-selector"

// Create async components for each Pokemon
async function LeftPokemonCard({ pokemon }: { pokemon: string }) {
  try {
    const data = await fetchPokemon(pokemon.toLowerCase())
    return (
      <div className="h-[725px] overflow-y-auto">
        <PokemonCompareCard pokemon={data} side="left" />
      </div>
    )
  } catch (error) {
    return (
      <div className="h-[725px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl border-2 border-dashed border-blue-200">
        <div className="text-center p-4 sm:p-6 lg:p-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl">❌</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">
            {pokemon} Not Found
          </h3>
          <p className="text-sm sm:text-base text-blue-600">
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
    return (
      <div className="h-[725px] overflow-y-auto">
        <PokemonCompareCard pokemon={data} side="right" />
      </div>
    )
  } catch (error) {
    return (
      <div className="h-[725px] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl border-2 border-dashed border-red-200">
        <div className="text-center p-4 sm:p-6 lg:p-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 bg-red-200 rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl">❌</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            {pokemon} Not Found
          </h3>
          <p className="text-sm sm:text-base text-red-600">
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
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-blue-50 via-purple-50 to-red-50">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Link
            href="/compare"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0 bg-white/70 px-3 py-1.5 rounded-lg hover:bg-white/90 border border-gray-200/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Back</span>
          </Link>
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-red-500 rounded-full"></div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-lg font-bold truncate bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                {leftPokemon && rightPokemon
                  ? (
                    <>
                      <span className="capitalize">{leftPokemon}</span>
                      <span className="hidden sm:inline mx-2 text-gray-400 font-normal">vs</span>
                      <span className="sm:hidden mx-1 text-gray-400 font-normal">v</span>
                      <span className="capitalize">{rightPokemon}</span>
                    </>
                  )
                  : leftPokemon
                    ? (
                      <>
                        <span className="capitalize">{leftPokemon}</span>
                        <span className="hidden sm:inline text-gray-500 font-normal"> - Select another to compare</span>
                        <span className="sm:hidden text-gray-500 font-normal"> +</span>
                      </>
                    )
                    : rightPokemon
                      ? (
                        <>
                          <span className="hidden sm:inline text-gray-500 font-normal">Select to compare with </span>
                          <span className="sm:hidden text-gray-500 font-normal">+ </span>
                          <span className="capitalize">{rightPokemon}</span>
                        </>
                      )
                      : "Pokémon Comparison Tool"
                }
              </h1>
              {leftPokemon && rightPokemon && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-blue-600 font-medium capitalize">{leftPokemon}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-red-600 font-medium capitalize">{rightPokemon}</span>
                  </div>
                </div>
              )}
            </div>
            {leftPokemon && rightPokemon && (
              <div className="hidden md:flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-lg border border-gray-200/50">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-600">Battle Ready</span>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 relative">
            <div className="hidden sm:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg border-4 border-white">
                VS
              </div>
            </div>

            {/* Left Pokemon Slot */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-700 text-center">
                  Pokémon A
                </h2>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              {leftPokemon ? (
                <Suspense fallback={<PokemonLoadingCard side="left" />}>
                  <LeftPokemonCard pokemon={leftPokemon} />
                </Suspense>
              ) : (
                <div className="h-[725px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl border-2 border-dashed border-blue-200 transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                  <div className="text-center p-4 sm:p-6 lg:p-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 bg-blue-200 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-lg sm:text-2xl lg:text-4xl">👈</span>
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-blue-700 mb-2">
                      Select Left Pokémon
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-blue-600">
                      Choose a Pokémon to compare
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* VS Badge - Mobile Only */}
            <div className="sm:hidden flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                VS
              </div>
            </div>
            {/* Right Pokemon Slot */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-red-700 text-center">
                  Pokémon B
                </h2>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              {rightPokemon ? (
                <Suspense fallback={<PokemonLoadingCard side="right" />}>
                  <RightPokemonCard pokemon={rightPokemon} />
                </Suspense>
              ) : (
                <div className="h-[725px] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl border-2 border-dashed border-red-200 transition-all duration-300 hover:border-red-300 hover:shadow-md">
                  <div className="text-center p-4 sm:p-6 lg:p-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 bg-red-200 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-lg sm:text-2xl lg:text-4xl">👉</span>
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-red-700 mb-2">
                      Select Right Pokémon
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-red-600">
                      Choose a Pokémon to compare
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {leftPokemon && rightPokemon && (
            <div className="bg-white rounded-xl shadow-md border p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href={`/pokemon/${leftPokemon.toLowerCase()}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-center text-sm font-medium"
                >
                  View {leftPokemon} Details
                </Link>
                <Link
                  href={`/pokemon/${rightPokemon.toLowerCase()}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-center text-sm font-medium"
                >
                  View {rightPokemon} Details
                </Link>
                <Link
                  href={`/compare/${rightPokemon.toLowerCase()}/${leftPokemon.toLowerCase()}`}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-center text-sm font-medium"
                >
                  Swap Positions
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  )
}
