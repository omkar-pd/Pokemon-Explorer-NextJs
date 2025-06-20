import { PokemonDetails } from "@/components/pokemon-details";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { slug } = await params

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
        const data = await response.json();
        return (
            <>
                <PokemonDetails pokemon={data} />
            </>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading Pokemon data</div>;
    }
}
