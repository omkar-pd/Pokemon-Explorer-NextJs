import type { Pokemon } from "@/lib/pokemon-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PokemonDetailsProps {
  pokemon: Pokemon
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">{pokemon.name}</h1>
        <Badge variant="outline" className="text-sm">
          #{pokemon.id.toString().padStart(3, "0")}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-center bg-muted/30 p-6">
            <img src={pokemon.sprites.other.dream_world.front_default || "/placeholder.svg"} alt={pokemon.name} className="h-64 w-64 object-contain" />
          </div>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Type</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {pokemon.types.map((type, index) => (
                <Badge key={index} className="capitalize">
                  {type.type.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
              <CardDescription>Special powers and characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pokemon.abilities.map((ability, index) => (
                  < li key={index} className="flex items-center gap-2" >
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="capitalize">{ability.ability.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-muted-foreground capitalize">{stat.stat.name}</p>
                    <p className="font-medium">{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  )
}
