<script>
  export let data;
  import PokemonHeader from "$lib/components/PokemonHeader.svelte";
</script>

<div class="max-w-4xl mx-auto pb-10">
<PokemonHeader pokemon={data.pokemon} />
</div>

<h1 class="text-2xl font-bold text-center pb-4">Available Cards</h1>

<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
{#each data.tradingCards as card}
  <div class="rounded-lg">
    <img src="{card.image}" alt="{card.name}" class="w-full h-auto" />
  </div>
{/each}
</div>