import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Sword, Shield, Zap, Star, Gauge, X } from "lucide-react"
import Link from "next/link"

interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other: {
      "official-artwork"?: {
        front_default: string
      }
      dream_world?: {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
}

interface PokemonCompareCardProps {
  pokemon: Pokemon
  side: "left" | "right"
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

export function PokemonCompareCard({ pokemon, side }: PokemonCompareCardProps) {
  const sideColor = side === "left" ? "blue" : "red"
  const borderColor = side === "left" ? "border-blue-200" : "border-red-200"
  const bgGradient = side === "left"
    ? "bg-gradient-to-br from-blue-50 to-blue-100"
    : "bg-gradient-to-br from-red-50 to-red-100"

  return (
    <div className={`${bgGradient} rounded-2xl border-2 ${borderColor} p-6 h-full`}>
      {/* Header with Remove Button */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <h3 className={`text-2xl font-bold text-${sideColor}-700 capitalize`}>
            {pokemon.name}
          </h3>
          <Badge className="bg-white text-gray-700">
            #{pokemon.id.toString().padStart(3, "0")}
          </Badge>
        </div>
      </div>

      {/* Pokemon Image */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-110"></div>
          <img
            src={
              pokemon.sprites.other["official-artwork"]?.front_default ||
              pokemon.sprites.other.dream_world?.front_default ||
              "/placeholder.svg?height=200&width=200"
            }
            alt={pokemon.name}
            className="relative w-32 h-32 mx-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Types */}
      <div className="flex justify-center gap-2 mb-6">
        {pokemon.types.map((type, index) => (
          <Badge
            key={index}
            className={`text-white font-medium ${typeColors[type.type.name] || "bg-gray-400"
              }`}
          >
            {type.type.name}
          </Badge>
        ))}
      </div>

      {/* Physical Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/60 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{pokemon.height / 10}m</p>
          <p className="text-sm text-gray-600">Height</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{pokemon.weight / 10}kg</p>
          <p className="text-sm text-gray-600">Weight</p>
        </div>
      </div>

      {/* Base Stats */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-800">Base Stats</h4>
        {pokemon.stats.map((stat) => {
          const IconComponent = statIcons[stat.stat.name as keyof typeof statIcons] || Heart
          const maxStat = 255
          const percentage = (stat.base_stat / maxStat) * 100

          return (
            <div key={stat.stat.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                </div>
                <span className="font-bold text-gray-800">{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${sideColor}-500 h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* View Details Button */}
      <div className="mt-6">
        <Link href={`/pokemon/${pokemon.name}`}>
          <Button className="w-full bg-white/80 text-gray-800 hover:bg-white">
            View Full Details
          </Button>
        </Link>
      </div>
    </div>
  )
}
