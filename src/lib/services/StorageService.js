import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

const LS_KEY = "collectionStates";

/** @typedef {Record<string, number>} CollectionStates */

// In-memory source of truth for the UI. Mirrored to localStorage as an offline
// cache and synced to Supabase (the durable store) whenever it changes.
/** @type {import("svelte/store").Writable<CollectionStates>} */
export const collectionStates = writable({});

/** @returns {CollectionStates} */
function readLocal() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "null") || {};
  } catch {
    return {};
  }
}

/** @param {CollectionStates} states */
function writeLocal(states) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(states));
}

// Migrate the old 2-state list (`collectedPokemons`: array of ids) to the
// 3-state map (`collectionStates`: { id: 0|1|2 }) in localStorage if needed.
export function migrateToCollectionStatesIfNeeded() {
  if (typeof window === "undefined") return;

  const hasNew = localStorage.getItem(LS_KEY);
  const hasOld = localStorage.getItem("collectedPokemons");

  if (!hasNew && hasOld) {
    /** @type {Array<string | number>} */
    const oldIds = JSON.parse(hasOld); // an array
    /** @type {CollectionStates} */
    const migrated = {};
    oldIds.forEach((id) => {
      migrated[id] = 1; // set state of pokemon id to pokeball
    });
    writeLocal(migrated);
    localStorage.removeItem("collectedPokemons");
  }
}

// Load the local collection into the store so anonymous (signed-out) users see
// their progress immediately on startup.
export function initLocalCollection() {
  collectionStates.set(readLocal());
}

// Merge the signed-in user's cloud collection with whatever is on this device.
// The cloud wins on conflicts, but any local-only progress is kept and pushed
// up — so a user who collected anonymously before signing in doesn't lose it.
/** @param {string} userId */
export async function loadCollection(userId) {
  const local = readLocal();

  const { data, error } = await supabase
    .from("collections")
    .select("states")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    // Network/DB hiccup: keep showing the local cache so the app still works.
    console.error("Failed to load collection from Supabase:", error);
    collectionStates.set(local);
    return;
  }

  const remote = data?.states || {};
  const merged = { ...local, ...remote };
  collectionStates.set(merged);
  writeLocal(merged);

  // Persist back if there's no row yet, or local added anything new to the cloud.
  if (!data || JSON.stringify(merged) !== JSON.stringify(remote)) {
    await saveRemote(userId, merged);
  }
}

/** @type {ReturnType<typeof setTimeout> | undefined} */
let saveTimer;

/** @param {string} userId @param {CollectionStates} states */
async function saveRemote(userId, states) {
  const { error } = await supabase.from("collections").upsert({
    user_id: userId,
    states,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error("Failed to save collection to Supabase:", error);
}

// Debounced so rapid toggles collapse into a single network write.
/** @param {CollectionStates} states */
function queueSave(states) {
  if (typeof window === "undefined") return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (userId) saveRemote(userId, states);
  }, 600);
}

// Cycle a pokemon through none -> pokeball -> masterball. Updates the UI
// instantly, caches locally, and syncs to the cloud in the background.
/** @param {string | number} pokemonId */
export function toggleCollectionState(pokemonId) {
  collectionStates.update((states) => {
    const current = Number(states[pokemonId]) || 0;
    const updated = { ...states, [pokemonId]: (current + 1) % 3 };
    writeLocal(updated);
    queueSave(updated);
    return updated;
  });
}

/** @param {string | number} pokemonId */
export function getCollectionState(pokemonId) {
  return Number(get(collectionStates)[pokemonId]) || 0;
}

// Clear the in-memory + cached collection on sign-out so the next user doesn't
// briefly see the previous user's data.
export function clearLocalCollection() {
  collectionStates.set({});
  if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
}
