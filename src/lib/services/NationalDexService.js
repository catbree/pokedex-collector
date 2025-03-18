export async function fetchNationalDex(fetchFn) {
    const response = await fetchFn("https://pokeapi.co/api/v2/pokemon-species?limit=1025");
    const data = await response.json();

    return data.results.map((pokemon, index) => ({
        id: index + 1, // National Dex number (since API gives them in order)
        name: pokemon.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
}