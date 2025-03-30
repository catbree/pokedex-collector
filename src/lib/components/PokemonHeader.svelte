<script>
    import { toggleCollected, isCollected } from "$lib/utils/collectionUtils.js";
    export let pokemon;
  
    let collected = isCollected(pokemon.id);
  
    function handleToggle(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleCollected(pokemon.id);
      collected = isCollected(pokemon.id); // Ensure reactivity
    }
  </script>
  
  <div class="flex items-center justify-between p-1 pl-2">
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
      class="text-gray-400 hover:text-gray-600 transition px-2 py-2 rounded-full cursor-pointer"
      on:click|stopPropagation={handleToggle}
    >
      {#if collected} <div class="bg-pkd-white-a0 rounded-full border-2 border-pkd-white-a0"><img src="/icons/pokeball.svg" alt="collected" /></div> {:else} <div class="bg-pkd-white-a40 rounded-full border-2 border-dashed border-pkd-purple-2"><img src="/icons/noball.svg" alt="not collected" /></div> {/if}
    </button>
  </div>