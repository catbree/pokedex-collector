<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { navigating } from '$app/stores';
    import { session } from '$lib/stores/auth';
    import { loadCollection, initLocalCollection } from '$lib/services/StorageService';

    // Anonymous users see their localStorage progress immediately on load.
    onMount(initLocalCollection);

    // When a user signs in, merge their cloud collection into the store (once).
    // Reset on sign-out so signing back in re-loads. The actual auth UI lives in
    // the About panel (SearchBar.svelte).
    /** @type {string | null} */
    let loadedUserId = $state(null);
    $effect(() => {
      const userId = $session?.user?.id ?? null;
      if (!userId) {
        loadedUserId = null;
      } else if (userId !== loadedUserId) {
        loadedUserId = userId;
        loadCollection(userId);
      }
    });
 </script>

<svelte:head>
  <title>1025 Pokémon National Dex Collection</title>
  <meta name="description" content="A simple tracker for your full National Dex Pokémon card collection." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/icons/favicon.svg" />

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XDK4EXJMBM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XDK4EXJMBM');
  </script>
</svelte:head>

<div class="bg-pkd-green-3 min-h-screen p-2">
	{#if $navigating}
		<div class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-pkd-green-3/80 backdrop-blur-sm">
			<img src="/icons/pokeball.svg" alt="" class="h-16 w-16 pulse-size" />
			<p class="font-pokemon text-2xs text-white">Loading…</p>
		</div>
	{/if}

	<slot />
</div>

<style>
	/* Grow-and-shrink "pulse" for the loading Pokéball (Tailwind's animate-pulse
	   only fades opacity). */
	@keyframes pulse-size {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}
	.pulse-size {
		animation: pulse-size 1s ease-in-out infinite;
	}
</style>
