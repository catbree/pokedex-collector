import { fetchPokemonCards } from '$lib/services/TCGService.js';

export async function load({ params, parent }) {
  const pokemonId = params.id;
  const tradingCards = await fetchPokemonCards(pokemonId);
  const { pokedex } = await parent();

  //Find specific pokemon
  const pokemon = pokedex.find(p => p.id == pokemonId);

  return { pokemon, tradingCards };
}