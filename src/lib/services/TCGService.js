const API = "https://api.tcgdex.net/v2/en";

// Cache set lookups so each set is fetched only once, even across page visits.
// We store the *promise* so concurrent cards asking for the same set share one request.
const setCache = new Map();

/** @param {string} setId */
function getSet(setId) {
    if (!setCache.has(setId)) {
        setCache.set(
            setId,
            fetch(`${API}/sets/${setId}`).then((r) => r.json())
        );
    }
    return setCache.get(setId);
}

export async function fetchPokemonCards(pokemonId) {
    const res = await fetch(`${API}/cards?dexId=${pokemonId}`);
    /** @type {Array<{ id: string, localId: string, name: string, image?: string }>} */
    const brief = await res.json();

    // Resolve each card's set, then drop digital-only Pokémon TCG Pocket cards
    // (serie "tcgp") so we keep only real, physical cards.
    const resolved = await Promise.all(
        brief.map(async (card) => ({
            card,
            set: await getSet(card.id.split("-")[0]), // "base1-4" -> "base1"
        }))
    );

    const cards = resolved
        .filter(({ set }) => set?.serie?.id !== "tcgp")
        .map(({ card, set }) => ({
            id: card.id,
            name: card.name,
            // TCGdex images are extension-less — you choose quality + format:
            image: card.image ? `${card.image}/high.webp` : null,
            releaseDate: set?.releaseDate ?? null, // "1999-01-09"
            setName: set?.name ?? "",
            setSeriesName: set?.serie?.name ?? "",
        }));

    // Newest first; cards with no date float to the front (usually old/promo).
    return cards.sort((a, b) => {
        const timeA = a.releaseDate ? new Date(a.releaseDate).getTime() : NaN;
        const timeB = b.releaseDate ? new Date(b.releaseDate).getTime() : NaN;

        const timeAexist = !isNaN(timeA);
        const timeBexist = !isNaN(timeB);

        if (!timeAexist && !timeBexist) return 0;
        if (!timeAexist) return 1;
        if (!timeBexist) return -1;

        return timeB - timeA;
    });
}
