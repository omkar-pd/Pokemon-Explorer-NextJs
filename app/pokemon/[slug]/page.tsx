import { PokemonDetails } from "@/components/pokemon-details";
import { fetchPokemon } from "@/lib/pokemon-utils";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const data = await fetchPokemon(slug);
    return <PokemonDetails pokemon={data} />;
}
