import { fetchPokemonCards } from '$lib/services/TCGService.js';
import { getCollectedPokemons } from '$lib/services/StorageService.js';
import { fetchNationalDex } from "$lib/services/nationalDexService.js";

export async function load({ params, fetch }) {
  const pokemonId = params.id;
  const collected = getCollectedPokemons();
  const tradingCards = await fetchPokemonCards(pokemonId);
  const pokedex = await fetchNationalDex(fetch);

  //Find specific pokemon
  const pokemon = pokedex.find(p => p.id == pokemonId);

  return { pokemon, collected, tradingCards };
}