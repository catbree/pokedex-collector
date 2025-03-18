export async function fetchPokemonCards(pokemonId) {

    const apiKey = import.meta.env.TCG_API_KEY;

    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${pokemonId}`, {
        headers: { "X-Api-Key": apiKey }
    });

    const data = await response.json();

    return data.data.map(card => ({
        id: card.id,
        name: card.name,
        image: card.images.large
    }));
}