import { fetchNationalDex } from "$lib/services/NationalDexService";
import { getCollectedPokemons } from "$lib/services/StorageService";

export async function load({ fetch }) {
  const pokedex = await fetchNationalDex(fetch);
  const collected = getCollectedPokemons(); // fetch before page load

  return { pokedex, collected };
}