<script>
  import {
    toggleCollectionState,
    getCollectionState
  } from "$lib/services/StorageService.js";
  
  export let pokemon;
  
  let pokemonState= getCollectionState(pokemon.id);
  
  function handleToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleCollectionState(pokemon.id);
    pokemonState = getCollectionState(pokemon.id); // Ensure reactivity
  }
</script>
  
  <div class="flex items-center justify-between p-2">
    <div class="flex items-center space-x-3">
      <div class="w-12 h-12 border border-pkd-purple-2" style="background: repeating-linear-gradient(
    45deg,
    var(--color-pkd-purple-1) 0px,
    var(--color-pkd-purple-1) 4px,
    var(--color-pkd-purple-2) 4px,
    var(--color-pkd-purple-2) 8px
  );">
        <img src="{pokemon.sprite}" alt="{pokemon.name}"/>
      </div>
      <div class="flex flex-col justify-center items-start">
        <span class="relative px-1 leading-none">
          <span class="z-1 relative inline-block font-pokemon text-xs text-pkd-purple-1 stroke-pkd-purple-3 px-1" style="-webkit-text-stroke: 3px var(--color-pkd-purple-3); paint-order: stroke fill;">{pokemon.id.toString().padStart(4, '0')}</span>
          <div class="absolute bg-pkd-purple-3 h-[40%] w-full top-[63%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xs"></div>
        </span>
        <p class="pt-1 font-pokemon text-xs text-pkd-purple-6 pb-1">{pokemon.name.toUpperCase()}</p>
      </div>
    </div>
  
    <button 
      class="w-12 h-12 transition rounded-full cursor-pointer"
      on:click|stopPropagation={handleToggle}
    >
      {#if pokemonState === 1}
        <div class="bg-pkd-white-a0 rounded-full border-1 border-pkd-white-a0"><img src="/icons/pokeball.svg" class="w-full h-full" alt="collected" /></div>
      {:else if pokemonState === 2}
        <div class="bg-pkd-white-a0 rounded-full border-1 border-pkd-white-a0"><img src="/icons/masterball.svg" class="w-full h-full" alt="collected and locked in" /></div>
      {:else} 
        <div class="bg-pkd-white-a40 rounded-full border-1 border-dashed border-pkd-purple-2 transition hover:bg-pkd-white-a80"><img src="/icons/noball.svg" class="w-full h-full" alt="not collected" /></div>
      {/if}
    </button>
  </div>