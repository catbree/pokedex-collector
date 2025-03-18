export function getCollectedPokemons() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("collectedPokemons")) || [];
}

export function saveCollectedPokemons(collectedList) {
    if (typeof window === "undefined") return;
    localStorage.setItem("collectedPokemons", JSON.stringify(collectedList)); //convert into string
}

export function addPokemonToCollection(pokemonId) {
    let collected = getCollectedPokemons();

    if (!collected.includes(pokemonId)) {
        collected.push(pokemonId);
        saveCollectedPokemons(collected);
    }
}

export function removePokemonFromCollection(pokemonId) {
    let collected = getCollectedPokemons();

    if (collected.includes(pokemonId)) {
        collected = collected.filter(id => id !== pokemonId);
        saveCollectedPokemons(collected);
    }
}