import { fetchPokemonCards } from '$lib/services/TCGService.js';
import { getCollectionState, migrateToCollectionStatesIfNeeded } from '$lib/services/StorageService.js';
import { fetchNationalDex } from "$lib/services/NationalDexService.js";

export async function load({ params, fetch }) {
  migrateToCollectionStatesIfNeeded();
  const pokemonId = params.id;
  const tradingCards = await fetchPokemonCards(pokemonId);
  const pokedex = await fetchNationalDex(fetch);

  //Find specific pokemon
  const pokemon = pokedex.find(p => p.id == pokemonId);

  return { pokemon, tradingCards };
}