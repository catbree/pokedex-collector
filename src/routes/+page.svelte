<script>
  export let data;
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PokemonHeader from '$lib/components/PokemonHeader.svelte';
  import ProgressSummary from '../lib/components/ProgressSummary.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  // Arriving here via a search made from another route (?dex=<id>, set by
  // the layout's topbar) — scroll/highlight the match, then drop the param.
  onMount(() => {
    const id = $page.url.searchParams.get('dex');
    if (!id) return;
    const el = document.getElementById(`pokemon-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 1500);
    }
    goto('/', { replaceState: true, noScroll: true, keepFocus: true });
  });
</script>

<style>
  /*-- this only applies when you're scrolling to the specific element */
  [id^="pokemon-"] {
    scroll-margin-top: 80px;
  }
</style>
<SectionHeader left="Collected"/>
<ProgressSummary/>
<SectionHeader left="National Pokedex"/>
<ul class="max-w-4xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2 my-2">
  {#each data.pokedex as pokemon}
    <li class="bg-pkd-cream border-[3px] border-pkd-ink shadow-[4px_4px_0_#1A120B] transition hover:bg-[#FFF7E3] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_#1A120B] cursor-pointer" id="pokemon-{pokemon.id}">
      <a href="/pokemon/{pokemon.id}" class="block">
        <PokemonHeader {pokemon}/>
      </a>
    </li>
  {/each}
</ul>