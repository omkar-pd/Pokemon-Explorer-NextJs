import type { Pokemon } from "@/lib/pokemon-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Zap,
  Shield,
  Sword,
  Heart,
  Gauge,
  ArrowRight,
  Flame,
  Droplets,
  Leaf,
  Snowflake,
  Skull,
  Mountain,
  Wind,
  Brain,
  Bug,
  Gem,
  Ghost,
  Sparkles,
  CircleDot,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface PokemonDetailsProps {
  pokemon: Pokemon
}

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

const statIcons = {
  hp: Heart,
  attack: Sword,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Star,
  speed: Gauge,
}

const typeIcons: Record<string, any> = {
  normal: CircleDot,
  fire: Flame,
  water: Droplets,
  electric: Zap,
  grass: Leaf,
  ice: Snowflake,
  fighting: Sword,
  poison: Skull,
  ground: Mountain,
  flying: Wind,
  psychic: Brain,
  bug: Bug,
  rock: Gem,
  ghost: Ghost,
  dragon: Sparkles,
  dark: CircleDot,
  steel: Shield,
  fairy: Star,
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const primaryType = pokemon.types[0]?.type.name || "normal"
  const TypeIcon = typeIcons[primaryType] || CircleDot

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-4 md:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-sm md:text-base">Back to Pokédex</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative mb-6 md:mb-8">
          <div className="relative bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50">
            {/* Type Icon Badge */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
              <div className={`${typeColors[primaryType]} rounded-lg p-2 shadow-lg`}>
                <TypeIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              {/* Pokemon Image */}
              <div className="relative">
                <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 bg-gradient-to-br from-white/50 to-white/30 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <img
                    src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Pokemon Info */}
              <div className="text-center w-full max-w-lg">
                <div className="mb-2 md:mb-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 capitalize">{pokemon.name}</h1>
                </div>
                
                {/* Type badges */}
                <div className="flex justify-center gap-2 mb-3 md:mb-4">
                  {pokemon.types.map((type) => (
                    <Badge
                      key={type.type.name}
                      className={`${typeColors[type.type.name]} text-white font-semibold px-3 py-1 md:px-4 md:py-1.5 text-sm capitalize shadow-lg`}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-xs md:max-w-sm mx-auto mb-3 md:mb-4">
                  <div className="text-center p-2 md:p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg">
                    <p className="text-base md:text-lg font-bold text-gray-800">{pokemon.height / 10}m</p>
                    <p className="text-xs text-gray-600 font-medium">Height</p>
                  </div>
                  <div className="text-center p-2 md:p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg">
                    <p className="text-base md:text-lg font-bold text-gray-800">{pokemon.weight / 10}kg</p>
                    <p className="text-xs text-gray-600 font-medium">Weight</p>
                  </div>
                  <div className="text-center p-2 md:p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg">
                    <p className="text-base md:text-lg font-bold text-gray-800">{pokemon.base_experience}</p>
                    <p className="text-xs text-gray-600 font-medium">Base XP</p>
                  </div>
                </div>

                {/* Compare Button */}
                <Link href={`/compare/${pokemon.name.toLowerCase()}`} className="block">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white border-0 py-2 px-6 text-sm md:text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Zap className="w-4 h-4 mr-2" />
                    Compare This Pokémon
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Abilities Card */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold">Abilities</h2>
              </div>
              <p className="text-sm md:text-base text-gray-600">Special powers and characteristics</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {pokemon.abilities.map((ability, index) => (
                  <div
                    key={index}
                    className="group p-3 md:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-primary to-primary/70 shadow-lg"></div>
                      <div className="flex-1">
                        <span className="text-base md:text-lg font-semibold capitalize text-gray-800">
                          {ability.ability.name.replace("-", " ")}
                        </span>
                        {ability.is_hidden && (
                          <Badge className="ml-2 md:ml-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md text-xs">
                            Hidden Ability
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base Stats Card */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold">Base Stats</h2>
              </div>
              <p className="text-sm md:text-base text-gray-600">Combat statistics and capabilities</p>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {pokemon.stats.map((stat, index) => {
                const IconComponent = statIcons[stat.stat.name as keyof typeof statIcons] || Zap
                const percentage = (stat.base_stat / 255) * 100
                return (
                  <div key={index} className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 md:gap-3">
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        <span className="text-sm md:text-base font-semibold capitalize text-gray-800">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                      </div>
                      <span className="text-base md:text-lg font-bold text-gray-800 bg-gray-100 px-2 py-1 md:px-3 md:py-1 rounded-full text-sm md:text-base">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={percentage} className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden" />
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl md:rounded-2xl">
                <span className="text-lg md:text-xl font-bold text-gray-800">Total Stats</span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Moves Card */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold">Notable Moves</h2>
              </div>
              <p className="text-sm md:text-base text-gray-600">Some of the moves this Pokémon can learn</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {pokemon.moves.slice(0, 16).map((move, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-primary/10 hover:to-primary/5 rounded-full text-xs md:text-sm font-medium capitalize text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 cursor-default border border-gray-200 hover:border-primary/20"
                  >
                    {move.move.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
