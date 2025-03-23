<script>
  export let data;
  import PokemonHeader from '$lib/components/PokemonHeader.svelte';
  import ProgressSummary from '$lib/components/ProgressSummary.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
</script>

<style>
  /*-- this only applies when you're scrolling to the specific element */
  [id^="pokemon-"] {
    scroll-margin-top: 80px;
  }
</style>

<h1 class="text-2xl font-bold text-center pb-4">National Pokédex</h1>
<ProgressSummary/>
<SearchBar pokedex={data.pokedex} />
<ul class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {#each data.pokedex as pokemon}
    <li class="bg-white rounded-lg" id="pokemon-{pokemon.id}">
      <a href="/pokemon/{pokemon.id}" class="block">
        <PokemonHeader {pokemon}/>
      </a>
    </li>
  {/each}
</ul>