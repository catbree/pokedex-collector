import { fetchNationalDex } from "$lib/services/NationalDexService";
import { migrateToCollectionStatesIfNeeded } from "$lib/services/StorageService";

export async function load({ fetch }) {
  migrateToCollectionStatesIfNeeded();
  const pokedex = await fetchNationalDex(fetch);
  return { pokedex };
}