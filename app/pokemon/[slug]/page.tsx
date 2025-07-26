import { PokemonDetails } from "@/components/pokemon-details";
import { fetchPokemon } from "@/lib/pokemon-utils";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const data = await fetchPokemon(slug);
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold capitalize">{data.name}</h1>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <PokemonDetails pokemon={data} />
            </div>
        </SidebarInset>
    );
}
