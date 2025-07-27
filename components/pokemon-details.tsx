import type { Pokemon } from "@/lib/pokemon-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  CircleDot
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

const typeBackgrounds: Record<string, string> = {
  normal: "bg-gradient-to-b from-slate-50 to-slate-100",
  fire: "bg-gradient-to-b from-red-50 to-slate-100",
  water: "bg-gradient-to-b from-blue-50 to-slate-100",
  electric: "bg-gradient-to-b from-yellow-50 to-slate-100",
  grass: "bg-gradient-to-b from-green-50 to-slate-100",
  ice: "bg-gradient-to-b from-cyan-50 to-slate-100",
  fighting: "bg-gradient-to-b from-red-100 to-slate-100",
  poison: "bg-gradient-to-b from-purple-50 to-slate-100",
  ground: "bg-gradient-to-b from-yellow-100 to-slate-100",
  flying: "bg-gradient-to-b from-indigo-50 to-slate-100",
  psychic: "bg-gradient-to-b from-pink-50 to-slate-100",
  bug: "bg-gradient-to-b from-green-100 to-slate-100",
  rock: "bg-gradient-to-b from-yellow-200 to-slate-100",
  ghost: "bg-gradient-to-b from-purple-100 to-slate-100",
  dragon: "bg-gradient-to-b from-indigo-100 to-slate-100",
  dark: "bg-gradient-to-b from-gray-200 to-slate-100",
  steel: "bg-gradient-to-b from-gray-100 to-slate-100",
  fairy: "bg-gradient-to-b from-pink-100 to-slate-100",
}

const statIcons = {
  hp: Heart,
  attack: Sword,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Star,
  speed: Gauge,
}

// Type icon mapping
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
  const backgroundGradient = typeBackgrounds[primaryType] || typeBackgrounds.normal
  const TypeIcon = typeIcons[primaryType] || CircleDot

  return (
    <div className={`min-h-screen ${backgroundGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Pokemon Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden sticky top-8">
              <div className="relative p-8 text-center">
                {/* Type Icon Badge - Replaces Pokemon ID */}
                <div className="absolute top-6 right-6 z-10">
                  <div className={`${typeColors[primaryType]} rounded-xl p-3 shadow-lg`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Pokemon Image - Added margin top to create space */}
                <div className="w-48 h-48 mx-auto mb-6 mt-4 bg-gradient-to-br from-white/50 to-white/30 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                  <img
                    src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-40 h-40 object-contain drop-shadow-2xl"
                  />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 capitalize mb-4">{pokemon.name}</h1>

                <div className="flex justify-center gap-3 mb-6">
                  {pokemon.types.map((type) => (
                    <Badge
                      key={type.type.name}
                      className={`${typeColors[type.type.name]} text-white font-semibold px-4 py-2 text-base capitalize shadow-lg`}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href={`/compare/${pokemon.name.toLowerCase()}`} className="w-full block">
                    <Button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white border-0 py-3 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Zap className="w-5 h-5 mr-2" />
                      Compare This Pokémon
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <div className="text-xs text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                    Start a comparison with {pokemon.name} vs another Pokémon
                  </div>
                </div>

                {/* Basic Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                    <p className="text-2xl font-bold text-gray-800">{pokemon.height / 10}m</p>
                    <p className="text-sm text-gray-600 font-medium">Height</p>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                    <p className="text-2xl font-bold text-gray-800">{pokemon.weight / 10}kg</p>
                    <p className="text-sm text-gray-600 font-medium">Weight</p>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                    <p className="text-2xl font-bold text-gray-800">{pokemon.base_experience}</p>
                    <p className="text-sm text-gray-600 font-medium">Base XP</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-blue-500/10 pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Abilities
                </CardTitle>
                <CardDescription className="text-base">Special powers and characteristics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pokemon.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/70 shadow-lg"></div>
                        <div className="flex-1">
                          <span className="text-lg font-semibold capitalize text-gray-800">
                            {ability.ability.name.replace("-", " ")}
                          </span>
                          {ability.is_hidden && (
                            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md">
                              Hidden Ability
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Base Stats */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-blue-500/10 pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-primary" />
                  Base Stats
                </CardTitle>
                <CardDescription className="text-base">Combat statistics and capabilities</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {pokemon.stats.map((stat, index) => {
                  const IconComponent = statIcons[stat.stat.name as keyof typeof statIcons] || Zap
                  const percentage = (stat.base_stat / 255) * 100
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <span className="text-base font-semibold capitalize text-gray-800">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={percentage} className="h-3 bg-gray-200 rounded-full overflow-hidden" />
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out shadow-sm"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
                <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
                  <span className="text-xl font-bold text-gray-800">Total Stats</span>
                  <span className="text-2xl font-bold text-primary">
                    {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Moves */}
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-blue-500/10 pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Notable Moves
                </CardTitle>
                <CardDescription className="text-base">Some of the moves this Pokémon can learn</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {pokemon.moves.slice(0, 16).map((move, index) => (
                    <span
                      key={index}
                      className="inline-block px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-primary/10 hover:to-primary/5 rounded-full text-sm font-medium capitalize text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 cursor-default border border-gray-200 hover:border-primary/20"
                    >
                      {move.move.name.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
