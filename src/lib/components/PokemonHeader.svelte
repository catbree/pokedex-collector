<script>
  import {
    collectionStates,
    toggleCollectionState
  } from "$lib/services/StorageService.js";

  export let pokemon;

  // Reactively derived from the shared store, so the icon updates everywhere
  // the moment the state changes (and after the cloud load completes).
  $: pokemonState = Number($collectionStates[pokemon.id]) || 0;

  function handleToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleCollectionState(pokemon.id);
  }
</script>
  
  <div class="flex items-center justify-between p-2">
    <div class="flex items-center space-x-3 min-w-0">
      <div class="w-12 h-12 shrink-0" style="background: repeating-linear-gradient(
    45deg,
    var(--color-pkd-cream) 0px,
    var(--color-pkd-cream) 4px,
    var(--color-pkd-cream-2) 4px,
    var(--color-pkd-cream-2) 8px
  );">
        <img src="{pokemon.sprite}" alt="{pokemon.name}"/>
      </div>
      <div class="flex flex-col justify-center items-start min-w-0">
        <span class="relative px-1 leading-none">
          <span class="z-1 relative inline-block font-pokemon text-xs text-pkd-lcd px-1" style="-webkit-text-stroke: 3px var(--color-pkd-green-d); paint-order: stroke fill;">{pokemon.id.toString().padStart(4, '0')}</span>
          <div class="absolute bg-pkd-green-d border-[2px] border-pkd-green-d h-[55%] w-full top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xs"></div>
        </span>
        <p class="w-full pt-1 font-pokemon text-xs text-pkd-ink pb-1 break-words">{pokemon.name.toUpperCase()}</p>
      </div>
    </div>

    <button
      class="w-14 h-14 shrink-0 transition cursor-pointer"
      on:click|stopPropagation={handleToggle}
    >
      {#if pokemonState === 1}
        <img src="/icons/pokeball.svg" class="w-full h-full" alt="collected" />
      {:else if pokemonState === 2}
        <img src="/icons/masterball.svg" class="w-full h-full" alt="favourite" />
      {:else}
        <img src="/icons/noball.svg" class="w-full h-full opacity-60 transition hover:opacity-100" alt="not collected" />
      {/if}
    </button>
  </div>