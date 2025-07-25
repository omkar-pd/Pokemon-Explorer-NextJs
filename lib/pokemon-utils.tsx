const BASE_URL = "https://pokeapi.co/api/v2";

export const getAllPokemon = async () => {
    try {
      const res = await fetch(`${BASE_URL}/pokemon?limit=1500`);
      const data = await res.json();
      const sortedPokemon = data.results.sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
      return sortedPokemon;
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      return [];
    }
  };

export const fetchPokemon = async (slug: string) => { 
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${slug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
}

export const fetchPopularPokemon = async () => {
  // Popular Pokemon IDs to fetch
  const popularIds = [25, 6, 9, 3, 448, 445]; // Pikachu, Charizard, Blastoise, Venusaur, Lucario, Garchomp
  
  try {
    const promises = popularIds.map(id => 
      fetch(`${BASE_URL}/pokemon/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon with ID ${id}`);
          }
          return response.json();
        })
    );
    
    const pokemonData = await Promise.all(promises);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching popular Pokemon:", error);
    throw error;
  }
}

