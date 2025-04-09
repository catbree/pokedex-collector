<script>
  export let data;
  import PokemonHeader from "$lib/components/PokemonHeader.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
</script>

<div class="max-w-4xl mx-auto bg-pkd-purple-1 mb-4">
<PokemonHeader pokemon={data.pokemon} />
</div>

<SectionHeader left="Cards found"/>

<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 px-1">
{#each data.tradingCards as card}
  <div class="rounded-lg">
    <img src="{card.image}" alt="{card.name}" class="w-full h-auto" />
    <div class="flex flex-col pt-2 pl-2 font-pokemon text-pkd-purple-1 text-2xs">
      <p>{card.releaseDate.slice(0,4)}</p>
      <p>{card.setSeriesName}, {card.setName}</p>
      {#if card.price}<p class="">${card.price}</p>{/if}
    </div>
  </div>
{/each}
</div>