import { useState, useEffect } from 'react'
import { getAllPokemon } from '@/lib/pokemon-utils'

interface Pokemon {
  name: string
  url: string
}

let pokemonCache: Pokemon[] = []
let isLoading = false
let hasLoaded = false

export function usePokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(pokemonCache)
  const [loading, setLoading] = useState(isLoading && !hasLoaded)

  useEffect(() => {
    if (hasLoaded) {
      setPokemon(pokemonCache)
      return
    }

    if (isLoading) {
      return
    }

    const fetchPokemon = async () => {
      isLoading = true
      setLoading(true)
      
      try {
        const data = await getAllPokemon()
        pokemonCache = data
        hasLoaded = true
        setPokemon(data)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
      } finally {
        isLoading = false
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  return { pokemon, loading }
}
