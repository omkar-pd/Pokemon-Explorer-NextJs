"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Shield,
  Sword,
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
  Star
} from "lucide-react"
import { fetchPopularPokemon } from "@/lib/pokemon-utils"

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork"?: {
        front_default: string;
      };
      dream_world?: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
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

export function PopularPokemon() {
  const [popularPokemon, setPopularPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularPokemon = async () => {
      try {
        const pokemonData = await fetchPopularPokemon();
        setPopularPokemon(pokemonData);
      } catch (error) {
        console.error("Error loading popular Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPopularPokemon();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Pokémon
            </h2>
            <p className="text-lg text-gray-600">Loading popular Pokemon...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Pokémon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover some of the most beloved Pokémon from across all generations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPokemon.map((pokemon) => {
            const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
            const defenseStat = pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0;
            const speedStat = pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0;
            const primaryType = pokemon.types[0]?.type?.name || 'normal'
            const TypeIcon = typeIcons[primaryType] || CircleDot

            return (
              <div
                key={pokemon.id}
                className="group bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 overflow-hidden relative"
              >
                <div className="absolute top-4 right-4 z-10">
                  <div className={`${typeColors[primaryType]} rounded-lg p-2 shadow-lg`}>
                    <TypeIcon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="relative mb-6 pt-2">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 capitalize group-hover:text-primary transition-colors">
                    {pokemon.name}
                  </h3>

                  <div className="flex justify-center gap-2">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type.type.name}
                        className={`${typeColors[type.type.name]} text-white font-medium px-3 py-1 text-sm capitalize`}
                      >
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Sword className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{attackStat}</div>
                      <div className="text-sm text-gray-600">Attack</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{defenseStat}</div>
                      <div className="text-sm text-gray-600">Defense</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{speedStat}</div>
                      <div className="text-sm text-gray-600">Speed</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 mt-6">
                    <Link
                      href={`/pokemon/${pokemon.name.toLowerCase()}`}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link
                      href={`/compare/${pokemon.name.toLowerCase()}`}
                      className="w-full"
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Compare
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
