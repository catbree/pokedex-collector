<script>
  export let data;
  import PokemonHeader from '$lib/components/PokemonHeader.svelte';
  import ProgressSummary from '../lib/components/ProgressSummary.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<style>
  /*-- this only applies when you're scrolling to the specific element */
  [id^="pokemon-"] {
    scroll-margin-top: 80px;
  }
</style>
<SearchBar pokedex={data.pokedex} />
<SectionHeader left="Collected"/>
<ProgressSummary/>
<SectionHeader left="National Pokedex"/>
<ul class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-2">
  {#each data.pokedex as pokemon}
    <li class="bg-pkd-cream border-[3px] border-pkd-ink shadow-[4px_4px_0_#1A120B] transition hover:bg-[#FFF7E3] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_#1A120B] cursor-pointer" id="pokemon-{pokemon.id}">
      <a href="/pokemon/{pokemon.id}" class="block">
        <PokemonHeader {pokemon}/>
      </a>
    </li>
  {/each}
</ul>