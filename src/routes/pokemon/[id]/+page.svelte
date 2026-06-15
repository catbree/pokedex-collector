<script>
  export let data;
  import PokemonHeader from "$lib/components/PokemonHeader.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import { goto } from "$app/navigation";

  // Go back through history so SvelteKit restores the scroll position on the
  // dex list (a plain href="/" is a fresh navigation that lands at the top).
  // Fall back to the home page when there's no history to return to.
  /** @param {MouseEvent} event */
  function goBack(event) {
    event.preventDefault();
    if (history.length > 1) history.back();
    else goto("/");
  }
</script>

<a href="/" on:click={goBack} class="flex flex-row items-center cursor-pointer text-white font-pokemon hover:underline text-3xs mb-1"><img class="w-8 h-8" src="/icons/chevron-left-white.svg" alt="arrow-up icon"/>Back</a>

<div class="max-w-4xl mx-auto bg-pkd-purple-1 mb-4">
  <PokemonHeader pokemon={data.pokemon} />
</div>

<SectionHeader left="Cards found" right={data.tradingCards.length}/>

<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 py-4 px-1">
{#each data.tradingCards as card}
  <div class="rounded-lg">
    <!-- Card image over a lightened card-back placeholder. The back shows
         through when a card has no image, the file 404s, or while loading. -->
    <div class="relative aspect-[5/7] overflow-hidden rounded-lg">
      <!-- Inset so a loaded (full-size) card image overlaps and fully covers it. -->
      <div class="absolute inset-2 flex items-center justify-center rounded-lg bg-pkd-purple-2/40">
        <img src="/icons/pokeball.svg" alt="" class="w-1/3 opacity-20" />
      </div>
      {#if card.image}
        <img
          src={card.image}
          alt={card.name}
          loading="lazy"
          class="absolute inset-0 h-full w-full object-contain"
          on:load={(e) => { if (e.currentTarget instanceof HTMLImageElement) e.currentTarget.previousElementSibling?.classList.add('hidden'); }}
          on:error={(e) => { if (e.currentTarget instanceof HTMLImageElement) e.currentTarget.style.display = 'none'; }}
        />
      {/if}
    </div>
    <div class="flex flex-col pt-3 px-2 font-pokemon text-pkd-purple-1 text-2xs gap-1">  
      <div class="flex flex-row gap-2">
        {#if card.releaseDate}<p>{card.releaseDate.slice(0, 4)}</p>{/if}
        <p class="text-pkd-white-a40">•</p>
        {#if card.price}<p>${card.price.toFixed(2)}</p>{/if}
      </div>
      <p class="text-3xs">{card.setSeriesName}, {card.setName}</p>
      
    </div>
  </div>
{/each}
</div>