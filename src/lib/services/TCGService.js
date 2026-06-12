const API = "https://api.tcgdex.net/v2/en";

export async function fetchPokemonCards(pokemonId) {
    const res = await fetch(`${API}/cards?dexId=${pokemonId}`);
    /** @type {Array<{ id: string, localId: string, name: string, image?: string }>} */
    const brief = await res.json();

    return brief.map((card) => ({
        id: card.id,
        name: card.name,
        // TCGdex images are extension-less — you choose quality + format:
        image: card.image ? `${card.image}/high.webp` : null,
    }));
}
