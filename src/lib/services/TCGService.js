export async function fetchPokemonCards(pokemonId) {

    const apiKey = import.meta.env.TCG_API_KEY;

    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${pokemonId}`, {
        headers: { "X-Api-Key": apiKey }
    });

    const data = await response.json();

    function getPrice(prices) {
        return (
            prices?.normal?.market ??
            prices?.holofoil?.market ??
            prices?.reverseHolofoil?.market ??
            prices?.["1stEditionNormal"]?.market ??
            prices?.["1stEditionHolofoil"]?.market ??
            null
        )
    }

    return data.data.map(card => ({
        id: card.id,
        name: card.name,
        image: card.images.large,
        releaseDate: card.set.releaseDate,
        setName: card.set.name,
        setSeriesName: card.set.series,
        price: getPrice(card.tcgplayer?.prices) ?? null // fallback if no price

    }));
}