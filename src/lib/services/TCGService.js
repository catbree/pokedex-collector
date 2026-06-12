const API = "https://api.tcgdex.net/v2/en";

// Rough fixed USD->SGD rate. Prices are estimates, so a static rate is fine;
// bump this when it drifts too far.
const USD_TO_SGD = 1.35;

/** @param {number|null} usd */
function toSGD(usd) {
    return usd == null ? null : Math.round(usd * USD_TO_SGD * 100) / 100;
}

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

// Pick a TCGplayer market price (USD), preferring the most "default" printing.
/** @param {any} pricing */
function getPrice(pricing) {
    const tp = pricing?.tcgplayer;
    if (!tp) return null;
    const variant =
        tp.normal ??
        tp.holofoil ??
        tp["reverse-holofoil"] ??
        tp["1st-edition-holofoil"] ??
        tp["1st-edition"] ??
        null;
    return variant?.marketPrice ?? null;
}

export async function fetchPokemonCards(pokemonId) {
    // `eq:` forces an exact match — without it TCGdex does a substring match,
    // so dexId=25 would also return 125, 225, 250, 255... (Electabuzz, Ho-Oh, etc.)
    const res = await fetch(`${API}/cards?dexId=eq:${pokemonId}`);
    /** @type {Array<{ id: string, localId: string, name: string, image?: string }>} */
    const brief = await res.json();

    // Phase 1: look up each card's set (cached) and drop digital-only
    // Pokémon TCG Pocket cards (serie "tcgp") so we keep only physical cards.
    const withSets = await Promise.all(
        brief.map(async (card) => ({
            card,
            set: await getSet(card.id.split("-")[0]), // "base1-4" -> "base1"
        }))
    );
    const physical = withSets.filter(({ set }) => set?.serie?.id !== "tcgp");

    // Phase 2: fetch full detail (for pricing) only for the cards we're keeping.
    const cards = await Promise.all(
        physical.map(async ({ card, set }) => {
            const full = await fetch(`${API}/cards/${card.id}`).then((r) => r.json());
            return {
                id: card.id,
                name: card.name,
                // TCGdex images are extension-less — you choose quality + format:
                image: card.image ? `${card.image}/high.webp` : null,
                releaseDate: set?.releaseDate ?? null, // "1999-01-09"
                setName: set?.name ?? "",
                setSeriesName: set?.serie?.name ?? "",
                price: toSGD(getPrice(full?.pricing)),
            };
        })
    );

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
