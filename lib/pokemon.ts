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
