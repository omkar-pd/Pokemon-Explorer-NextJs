export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
  abilities: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
  }
}

export const pokemonData: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    image: "/placeholder.svg?height=200&width=200",
    types: ["grass", "poison"],
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
  },
  {
    id: 2,
    name: "Ivysaur",
    image: "/placeholder.svg?height=200&width=200",
    types: ["grass", "poison"],
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      speed: 60,
    },
  },
  {
    id: 3,
    name: "Venusaur",
    image: "/placeholder.svg?height=200&width=200",
    types: ["grass", "poison"],
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
    },
  },
  {
    id: 4,
    name: "Charmander",
    image: "/placeholder.svg?height=200&width=200",
    types: ["fire"],
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
  },
  {
    id: 5,
    name: "Charmeleon",
    image: "/placeholder.svg?height=200&width=200",
    types: ["fire"],
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 58,
      attack: 64,
      defense: 58,
      speed: 80,
    },
  },
  {
    id: 6,
    name: "Charizard",
    image: "/placeholder.svg?height=200&width=200",
    types: ["fire", "flying"],
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      speed: 100,
    },
  },
  {
    id: 7,
    name: "Squirtle",
    image: "/placeholder.svg?height=200&width=200",
    types: ["water"],
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
  },
  {
    id: 8,
    name: "Wartortle",
    image: "/placeholder.svg?height=200&width=200",
    types: ["water"],
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 59,
      attack: 63,
      defense: 80,
      speed: 58,
    },
  },
  {
    id: 9,
    name: "Blastoise",
    image: "/placeholder.svg?height=200&width=200",
    types: ["water"],
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 79,
      attack: 83,
      defense: 100,
      speed: 78,
    },
  },
  {
    id: 10,
    name: "Caterpie",
    image: "/placeholder.svg?height=200&width=200",
    types: ["bug"],
    abilities: ["shield-dust", "run-away"],
    stats: {
      hp: 45,
      attack: 30,
      defense: 35,
      speed: 45,
    },
  },
  {
    id: 11,
    name: "Metapod",
    image: "/placeholder.svg?height=200&width=200",
    types: ["bug"],
    abilities: ["shed-skin"],
    stats: {
      hp: 50,
      attack: 20,
      defense: 55,
      speed: 30,
    },
  },
  {
    id: 12,
    name: "Butterfree",
    image: "/placeholder.svg?height=200&width=200",
    types: ["bug", "flying"],
    abilities: ["compound-eyes", "tinted-lens"],
    stats: {
      hp: 60,
      attack: 45,
      defense: 50,
      speed: 70,
    },
  },
  {
    id: 25,
    name: "Pikachu",
    image: "/placeholder.svg?height=200&width=200",
    types: ["electric"],
    abilities: ["static", "lightning-rod"],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
  },
  {
    id: 26,
    name: "Raichu",
    image: "/placeholder.svg?height=200&width=200",
    types: ["electric"],
    abilities: ["static", "lightning-rod"],
    stats: {
      hp: 60,
      attack: 90,
      defense: 55,
      speed: 110,
    },
  },
  {
    id: 150,
    name: "Mewtwo",
    image: "/placeholder.svg?height=200&width=200",
    types: ["psychic"],
    abilities: ["pressure", "unnerve"],
    stats: {
      hp: 106,
      attack: 110,
      defense: 90,
      speed: 130,
    },
  },
]
