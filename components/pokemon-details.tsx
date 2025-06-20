import type { Pokemon } from "@/lib/pokemon-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

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

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        <Badge variant="outline" className="text-sm">
          #{pokemon.id.toString().padStart(3, "0")}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pokemon Image */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/60 p-8">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.other.dream_world.front_default || "/placeholder.svg?height=300&width=300"}
              alt={pokemon.name}
              className="h-64 w-64 object-contain drop-shadow-lg"
            />
          </div>
        </Card>

        {/* Basic Info */}
        <div className="grid gap-6">
          {/* Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Types</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {pokemon.types.map((type, index) => (
                <Badge
                  key={index}
                  className={`capitalize text-white font-medium px-3 py-1 ${typeColors[type.type.name] || "bg-gray-400"}`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Physical Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Characteristics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">{pokemon.height / 10}m</p>
                  <p className="text-sm text-muted-foreground">Height</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">{pokemon.weight / 10}kg</p>
                  <p className="text-sm text-muted-foreground">Weight</p>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-semibold">{pokemon.base_experience}</p>
                <p className="text-sm text-muted-foreground">Base Experience</p>
              </div>
            </CardContent>
          </Card>

          {/* Abilities */}
          <Card>
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
              <CardDescription>Special powers and characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {pokemon.abilities.map((ability, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-primary flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="capitalize font-medium">{ability.ability.name.replace("-", " ")}</span>
                      {ability.is_hidden && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Hidden
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Moves */}
        <div className="grid gap-6">
          {/* Base Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Base Stats</CardTitle>
              <CardDescription>Combat statistics and capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{stat.stat.name.replace("-", " ")}</span>
                    <span className="text-sm font-bold">{stat.base_stat}</span>
                  </div>
                  <Progress value={(stat.base_stat / 255) * 100} className="h-2" />
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Moves */}
          <Card>
            <CardHeader>
              <CardTitle>Notable Moves</CardTitle>
              <CardDescription>Some of the moves this Pokémon can learn</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {pokemon.moves.slice(0, 12).map((move, index) => (
                  <span key={index}>
                    <span className="text-sm font-medium capitalize">{move.move.name.replace("-", " ")}</span>
                    {index < pokemon.moves.slice(0, 12).length - 1 && ", "}
                  </span>
                ))}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
