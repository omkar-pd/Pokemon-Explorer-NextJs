"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Sword } from "lucide-react"

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

export function PopularPokemon() {
  const [popularPokemon, setPopularPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  // Popular Pokemon IDs to fetch
  const popularIds = [25, 6, 9, 3, 448, 445]; // Pikachu, Charizard, Blastoise, Venusaur, Lucario, Garchomp

  useEffect(() => {
    const fetchPopularPokemon = async () => {
      try {
        const promises = popularIds.map(id => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );
        const pokemonData = await Promise.all(promises);
        setPopularPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching popular Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPokemon();
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

            return (
              <Link
                key={pokemon.id}
                href={`/pokemon/${pokemon.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 overflow-hidden">
                  {/* Pokemon Image */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-xl scale-110"></div>
                    <img
                      src={
                        pokemon.sprites.other["official-artwork"]?.front_default ||
                        pokemon.sprites.other.dream_world?.front_default ||
                        "/placeholder.svg?height=150&width=150"
                      }
                      alt={pokemon.name}
                      className="relative w-32 h-32 mx-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Pokemon Info */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 capitalize">
                        {pokemon.name}
                      </h3>
                      <Badge className="bg-primary text-white">
                        #{pokemon.id.toString().padStart(3, "0")}
                      </Badge>
                    </div>
                    
                    {/* Types */}
                    <div className="flex justify-center gap-2 mb-4">
                      {pokemon.types.map((type, index) => (
                        <Badge
                          key={index}
                          className={`text-white font-medium text-xs ${
                            typeColors[type.type.name] || "bg-gray-400"
                          }`}
                        >
                          {type.type.name}
                        </Badge>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-red-50 rounded-lg p-2 border border-red-100">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Sword className="w-3 h-3 text-red-500" />
                        </div>
                        <p className="text-sm font-bold text-red-600">{attackStat}</p>
                        <p className="text-xs text-red-500">ATK</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Shield className="w-3 h-3 text-blue-500" />
                        </div>
                        <p className="text-sm font-bold text-blue-600">{defenseStat}</p>
                        <p className="text-xs text-blue-500">DEF</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-100">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Zap className="w-3 h-3 text-yellow-500" />
                        </div>
                        <p className="text-sm font-bold text-yellow-600">{speedStat}</p>
                        <p className="text-xs text-yellow-500">SPD</p>
                      </div>
                    </div>

                    {/* Physical Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="font-medium">{pokemon.height / 10}m</p>
                        <p>Height</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="font-medium">{pokemon.weight / 10}kg</p>
                        <p>Weight</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
