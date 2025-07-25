import type { Pokemon } from "@/lib/pokemon-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Star, Zap, Shield, Sword, Heart, Gauge } from "lucide-react"

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

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const primaryType = pokemon.types[0]?.type.name || "normal"
  const backgroundGradient = typeBackgrounds[primaryType] || typeBackgrounds.normal

  return (
    <div className={`min-h-screen ${backgroundGradient}`}>
      <div className="container py-8 md:py-12">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl scale-110"></div>
                <img
                  src={
                    pokemon.sprites.other["official-artwork"]?.front_default ||
                    pokemon.sprites.other.dream_world?.front_default ||
                    "/placeholder.svg?height=300&width=300" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt={pokemon.name}
                  className="relative h-48 w-48 md:h-64 md:w-64 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold capitalize bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {pokemon.name}
                  </h1>
                  <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </Badge>
                </div>
                <div className="flex justify-center md:justify-start gap-3 mb-6">
                  {pokemon.types.map((type, index) => (
                    <Badge
                      key={index}
                      className={`text-white font-semibold px-6 py-2 text-base shadow-lg ${
                        typeColors[type.type.name] || "bg-gray-400"
                      }`}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
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
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Abilities */}
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
  )
}
