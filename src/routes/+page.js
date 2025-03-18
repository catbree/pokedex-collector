import { fetchNationalDex } from "$lib/services/nationalDexService";
import { getCollectedPokemons } from "$lib/services/storageService";

export async function load({ fetch }) {
  const pokedex = await fetchNationalDex(fetch);
  const collected = getCollectedPokemons(); // fetch before page load

  return { pokedex, collected };
}