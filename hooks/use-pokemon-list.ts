import { useState, useEffect } from 'react'

interface Pokemon {
  name: string
  url: string
}

export function usePokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        setLoading(true)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon list')
        }
        const data = await response.json()
        setPokemon(data.results)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setPokemon([])
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonList()
  }, [])

  return { pokemon, loading, error }
}
