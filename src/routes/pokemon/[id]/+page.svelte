<script>
  export let data;
  import PokemonHeader from "$lib/components/PokemonHeader.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
</script>

<a href="/" class="flex flex-row items-center cursor-pointer text-white font-pokemon hover:underline text-3xs mb-1"><img class="w-8 h-8" src="/icons/chevron-left-white.svg" alt="arrow-up icon"/>Back</a>

<div class="max-w-4xl mx-auto bg-pkd-purple-1 mb-4">
  <PokemonHeader pokemon={data.pokemon} />
</div>

<SectionHeader left="Cards found" right={data.tradingCards.length}/>

<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 py-4 px-1">
{#each data.tradingCards as card}
  <div class="rounded-lg">
    <img src="{card.image}" alt="{card.name}" class="w-full h-auto" />
    <div class="flex flex-col pt-3 px-2 font-pokemon text-pkd-purple-1 text-2xs gap-1">  
      <div class="flex flex-row gap-2">
        <p>{card.releaseDate.slice(0,4)}</p>
        <p class="text-pkd-white-a40">•</p>
        {#if card.price}<p>${card.price}</p>{/if}
      </div>
      <p class="text-3xs">{card.setSeriesName}, {card.setName}</p>
      
    </div>
  </div>
{/each}
</div>