import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

/** @typedef {import("@supabase/supabase-js").Session} Session */

// session: undefined = still loading, null = signed out, object = signed in.
export const session = writable(
  /** @type {Session | null | undefined} */ (undefined)
);

if (typeof window !== "undefined") {
  // Restore any existing session on load, then keep the store in sync with
  // sign-in / sign-out / token-refresh events.
  supabase.auth.getSession().then(({ data }) => session.set(data.session));
  supabase.auth.onAuthStateChange((_event, newSession) => session.set(newSession));
}

/** @param {string} email @param {string} password */
export function signUp(email, password) {
  return supabase.auth.signUp({ email, password });
}

/** @param {string} email @param {string} password */
export function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signOut() {
  return supabase.auth.signOut();
}
