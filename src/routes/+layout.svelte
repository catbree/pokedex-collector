<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { navigating, page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { session, signOut } from '$lib/stores/auth';
    import { loadCollection, initLocalCollection, clearLocalCollection } from '$lib/services/StorageService';
    import Auth from '$lib/components/Auth.svelte';

    let { data } = $props();

    // Anonymous users see their localStorage progress immediately on load.
    onMount(initLocalCollection);

    // When a user signs in, merge their cloud collection into the store (once).
    // Reset on sign-out so signing back in re-loads.
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

    /** @type {HTMLElement | undefined} */
    let lcdEl = $state();
    let searchTerm = $state('');
    let showAuth = $state(false);
    let showAccount = $state(false);

    function scrollToTop() {
      lcdEl?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /** @param {string | number} id */
    function highlightPokemon(id) {
      const el = document.getElementById(`pokemon-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('highlight');
        setTimeout(() => el.classList.remove('highlight'), 1500);
      }
    }

    // Searching away from the dex list navigates home with the match's id in
    // the URL; +page.svelte picks ?dex= up on load and scrolls/highlights it.
    function scrollToPokemon() {
      const pokedex = data.pokedex ?? [];
      const match = pokedex.find((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString() === searchTerm
      );

      if (!match) {
        alert('Pokémon not found!');
        return;
      }

      if ($page.url.pathname === '/') {
        highlightPokemon(match.id);
      } else {
        goto(`/?dex=${match.id}`);
      }
      searchTerm = ''; //ux: clear input on search match
    }

    async function handleSignOut() {
      await signOut();
      // Clear the device cache so an anonymous/next session doesn't inherit
      // (or accidentally re-upload) the previous account's collection.
      clearLocalCollection();
      showAccount = false;
    }

    function exportProgress() {
      const exported = JSON.stringify(localStorage);
      navigator.clipboard.writeText(exported)
        .then(() => alert('Copied to clipboard!'))
        .catch(() => alert('Failed to copy.'));
    }

    async function importProgress() {
      try {
        const text = await navigator.clipboard.readText();
        const imported = JSON.parse(text);
        Object.entries(imported).forEach(([k, v]) => localStorage.setItem(k, v));
        alert('Progress imported! Reloading...');
        location.reload();
      } catch {
        alert('Failed to import. Make sure you copied valid data.');
      }
    }
 </script>

<svelte:head>
  <title>1025 Pokémon National Dex Collection</title>
  <meta name="description" content="A simple tracker for your full National Dex Pokémon card collection." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
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

<div class="h-[100dvh] overflow-hidden flex bg-pkd-ink" style="padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);">
	{#if $navigating}
		<div class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-pkd-ink/80 backdrop-blur-sm">
			<img src="/icons/pokeball.svg" alt="" class="h-16 w-16 pulse-size" />
			<p class="font-pokemon text-2xs text-pkd-cream">Loading…</p>
		</div>
	{/if}

	<!-- Pokédex device shell: fixed, fills the viewport height -->
	<div
		class="mx-auto flex w-full max-w-3xl min-h-0 flex-col bg-pkd-shell border-[4px] border-pkd-ink rounded-2xl p-2 sm:p-3"
		style="box-shadow: inset 0 4px 0 var(--color-pkd-shell-hi), inset 0 -8px 0 var(--color-pkd-shell-3), 8px 10px 0 rgba(0,0,0,.35);"
	>
		<!-- Topbar: persistent across every route, sits above the scrolling LCD. -->
		<div class="flex shrink-0 items-center gap-2 pb-2 sm:pb-3">
			<!-- search: dark LCD strip -->
			<div class="flex flex-1 min-w-0 h-12 items-center gap-2 pl-2 pr-3 bg-[#10160C] border-[3px] border-pkd-ink rounded-[8px]" style="box-shadow: inset 0 0 0 3px #2a3a22, inset 0 2px 8px rgba(0,0,0,.55);">
				<input
					bind:value={searchTerm}
					placeholder="Search ditto or 132"
					class="w-full bg-transparent border-0 font-pokemon text-xs text-pkd-lcd placeholder-[#5e7a48] focus:ring-0 focus:outline-none"
					onkeydown={(e) => { if (e.key === 'Enter') scrollToPokemon(); }}
				/>
				<button onclick={scrollToPokemon} aria-label="Search" class="shrink-0 cursor-pointer">
					<span
						class="block w-5 h-5 bg-pkd-lcd"
						style="mask-image: url(/icons/search-white.svg); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url(/icons/search-white.svg); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
						aria-hidden="true"
					></span>
				</button>
			</div>

			<!-- scroll to top: glossy red device key -->
			<button
				onclick={scrollToTop}
				aria-label="Scroll to top"
				class="w-12 h-12 shrink-0 grid place-items-center rounded-[10px] border-[3px] border-pkd-ink cursor-pointer active:translate-y-0.5"
				style="background: radial-gradient(circle at 37% 31%, var(--color-pkd-shell-hi) 0 17%, var(--color-pkd-shell) 60%, var(--color-pkd-shell-3) 100%); box-shadow: inset -2px -3px 0 rgba(0,0,0,.22), inset 2px 2px 0 rgba(255,255,255,.25);"
			>
				<span
					class="block w-7 h-7 bg-pkd-shell-3"
					style="mask-image: url(/icons/arrow-up-bold.svg); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url(/icons/arrow-up-bold.svg); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; filter: drop-shadow(-1px -1px 0 rgba(0,0,0,.45)) drop-shadow(1px 1px 0 rgba(255,255,255,.35));"
					aria-hidden="true"
				></span>
			</button>

			<!-- decorative status LEDs -->
			<span class="hidden sm:flex shrink-0 gap-1.5" aria-hidden="true">
				<i class="block w-3 h-3 rounded-full border-2 border-pkd-ink bg-[#ff5347]" style="box-shadow: inset -2px -2px 0 rgba(0,0,0,.25);"></i>
				<i class="block w-3 h-3 rounded-full border-2 border-pkd-ink bg-pkd-gold" style="box-shadow: inset -2px -2px 0 rgba(0,0,0,.25);"></i>
				<i class="block w-3 h-3 rounded-full border-2 border-pkd-ink bg-[#7ec460]" style="box-shadow: inset -2px -2px 0 rgba(0,0,0,.25);"></i>
			</span>

			<!-- the lens IS the login button: muted+pulsing when signed out, vivid+glowing when synced -->
			<button
				onclick={() => { if ($session) showAccount = true; else showAuth = true; }}
				aria-label={$session ? 'Account' : 'Sign in to sync'}
				title={$session ? 'Signed in — collection synced' : 'Sign in to sync'}
				class="relative w-12 h-12 shrink-0 rounded-full border-[4px] border-pkd-ink cursor-pointer active:translate-y-0.5 {$session ? '' : 'grayscale-[60%] brightness-95 animate-[lensPulse_1.15s_ease-in-out_infinite]'}"
				style="background: radial-gradient(circle at 34% 30%, var(--color-pkd-lens-hi) 0 16%, var(--color-pkd-lens) 58%, #15314f 100%); box-shadow: {$session ? 'inset 0 0 0 3px #bfe9cf, 0 0 11px rgba(85,225,135,.75), 0 3px 0 var(--color-pkd-shell-3)' : 'inset 0 0 0 3px #cfe0ff, 0 3px 0 var(--color-pkd-shell-3)'};"
			>
				<span
					class="absolute -right-[3px] -bottom-[3px] w-[13px] h-[13px] rounded-full border-[3px] border-pkd-ink {$session ? 'bg-[#7dffae] shadow-[0_0_7px_#7dffae]' : 'bg-[#c94a3f] animate-[dotblink_1.15s_steps(2)_infinite]'}"
				></span>
			</button>
		</div>

		<!-- Screen frame: dark recessed bezel with corner screws; only .lcd-scroll scrolls. -->
		<div class="relative flex flex-1 min-h-0 bg-[#0e120a] border-[4px] border-pkd-ink rounded-[10px] p-2 sm:p-2.5" style="box-shadow: inset 0 0 0 4px #243018;">
			<i class="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#c9c2ad] border-2 border-pkd-ink" aria-hidden="true"></i>
			<i class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c9c2ad] border-2 border-pkd-ink" aria-hidden="true"></i>
			<i class="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#c9c2ad] border-2 border-pkd-ink" aria-hidden="true"></i>
			<i class="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c9c2ad] border-2 border-pkd-ink" aria-hidden="true"></i>

			<div
				bind:this={lcdEl}
				class="lcd-scroll min-h-0 flex-1 overflow-y-auto bg-pkd-cream border-[3px] border-[#1c2a14] rounded-[4px] p-2 sm:p-3"
			>
				<slot />
			</div>
		</div>
	</div>
</div>

{#if showAccount && $session}
	<div
		role="button" tabindex="0"
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') showAccount = false; }}
		onclick={() => showAccount = false}
		class="fixed top-0 left-0 w-full h-full z-100 bg-pkd-ink/70 flex items-center justify-center px-4"
	>
		<div
			onclick={(e) => e.stopPropagation()}
			aria-hidden="true"
			class="relative bg-pkd-cream border-[3px] border-pkd-ink text-pkd-ink font-pokemon text-2xs w-full max-w-xl px-4 sm:px-8 py-4 sm:py-6 m-2 sm:m-4 overflow-y-auto max-h-[90vh]"
			style="box-shadow: 6px 6px 0 var(--color-pkd-ink);"
		>
			<div class="flex flex-row justify-between mb-2 items-center">
				<h2 class="text-sm">ACCOUNT</h2>
				<button onclick={() => showAccount = false} aria-label="Close" class="cursor-pointer opacity-60 hover:opacity-100"><img class="w-3 h-3" src="/icons/cross.svg" alt=""/></button>
			</div>
			<div class="mb-4 flex flex-row items-center justify-between gap-2 border-[3px] border-pkd-ink bg-white p-3">
				<span class="truncate">Signed in as {$session.user.email}</span>
				<button onclick={handleSignOut} class="shrink-0 border-[3px] border-pkd-ink bg-pkd-shell px-3 py-2 text-white cursor-pointer hover:bg-pkd-shell-2">Sign out</button>
			</div>
			<p class="mb-4 text-pkd-green-on border-[3px] border-pkd-ink bg-white p-3">Your progress is saved to your account and synced across devices.</p>
			<p class="mb-4">If you're looking for something simple to check off your full Pokemon National Pokedex collection (currently: 1025) and browse available cards, this may work for you!</p>
			<p class="mb-4">To start, tap a Pokéball to mark something as collected. Click on a Pokémon to view all of its available cards.</p>
			<p class="mb-4 text-pkd-green">
				Credit goes to <a href="https://developer.tcgplayer.com/" target="_blank" rel="noopener noreferrer" class="underline">TCGplayer API</a> and <a href="https://pokemontcg.io/" target="_blank" rel="noopener noreferrer" class="underline">Pokémon TCG API</a> for data, <a href="https://www.dafont.com/pkmn-rbygsc.font" target="_blank" rel="noopener noreferrer" class="underline">dafont.com</a> for fonts, and <a href="https://www.nintendo.com/" target="_blank" rel="noopener noreferrer" class="underline">Nintendo</a>, <a href="https://www.gamefreak.co.jp/" target="_blank" rel="noopener noreferrer" class="underline">Game Freak</a>, and <a href="https://www.pokemon.com/" target="_blank" rel="noopener noreferrer" class="underline">The Pokémon Company</a> for Pokémon.
			</p>
			<p class="mb-2 text-pkd-green">Passion project built and designed by <a href="https://leunghoicheng.com" target="_blank" rel="noopener noreferrer" class="underline">catbree</a></p>
			<div class="flex flex-row gap-2 justify-end">
				<button onclick={exportProgress} class="border-[3px] border-pkd-ink bg-white px-4 py-2 cursor-pointer hover:bg-pkd-cream-2">Export Progress</button>
				<button onclick={importProgress} class="border-[3px] border-pkd-ink bg-white px-4 py-2 cursor-pointer hover:bg-pkd-cream-2">Import Progress</button>
			</div>
		</div>
	</div>
{/if}

{#if showAuth}
	<Auth onClose={() => showAuth = false} />
{/if}

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

	/* Retro green scrollbar for the LCD screen. */
	:global(.lcd-scroll) {
		scrollbar-color: var(--color-pkd-green) var(--color-pkd-cream-2);
	}
	:global(.lcd-scroll::-webkit-scrollbar) {
		width: 11px;
	}
	:global(.lcd-scroll::-webkit-scrollbar-track) {
		background: var(--color-pkd-cream-2);
		border-left: 3px solid #1c2a14;
	}
	:global(.lcd-scroll::-webkit-scrollbar-thumb) {
		background: var(--color-pkd-green);
		border: 2px solid var(--color-pkd-ink);
	}
</style>
