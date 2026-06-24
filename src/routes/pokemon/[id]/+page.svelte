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

<a
  href="/"
  on:click={goBack}
  class="inline-flex items-center gap-1 cursor-pointer text-pkd-green font-pokemon text-2xs mb-3 hover:underline"
><img class="w-4 h-4" src="/icons/chevron-left.svg" alt=""/>BACK TO DEX</a>

<div class="max-w-4xl mx-auto bg-pkd-cream border-[3px] border-pkd-ink shadow-[4px_4px_0_var(--color-pkd-ink)] mb-4">
  <PokemonHeader pokemon={data.pokemon} />
</div>

<SectionHeader left="Cards found" right={data.tradingCards.length}/>

<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 py-4 px-1">
{#each data.tradingCards as card}
  <div>
    <!-- Card image over a lightened card-back placeholder. The back shows
         through when a card has no image, the file 404s, or while loading. -->
    <div class="relative aspect-[5/7] overflow-hidden border-[3px] border-pkd-ink shadow-[4px_4px_0_var(--color-pkd-ink)]">
      <!-- Inset so a loaded (full-size) card image overlaps and fully covers it. -->
      <div class="absolute inset-2 flex items-center justify-center bg-pkd-cream-2/60">
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
    <div class="flex flex-col pt-3 px-2 font-pokemon text-pkd-green text-2xs gap-1">
      <div class="flex flex-row gap-2">
        {#if card.releaseDate}<p>{card.releaseDate.slice(0, 4)}</p>{/if}
        <p class="text-[#9a8a63]">•</p>
        {#if card.price}<p>${card.price.toFixed(2)}</p>{/if}
      </div>
      <p class="text-3xs text-pkd-ink">{card.setSeriesName}, {card.setName}</p>

    </div>
  </div>
{/each}
</div>