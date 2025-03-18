import {
    getCollectedPokemons,
    addPokemonToCollection,
    removePokemonFromCollection
} from "$lib/services/StorageService.js";

//checks if a pokemon is already collected
export function isCollected(pokemonId) {
    let collected = getCollectedPokemons();
    return collected.includes(pokemonId)
}

export function toggleCollected(pokemonId) {
    if (isCollected(pokemonId)) {
        removePokemonFromCollection(pokemonId);
    } else {
        addPokemonToCollection(pokemonId);
    }
}

export function getUpdatedCollectedSet() {
    return new Set(getCollectedPokemons());
}