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
  
  <div class="flex items-center justify-between p-4 rounded-lg transition hover:bg-gray-200 cursor-pointer ">
    <div class="flex items-center space-x-3">
      <img src="{pokemon.sprite}" alt="{pokemon.name}" class="w-10 h-10" />
      <div>
        <span class="relative px-1">
          <p class="z-1 relative inline-block font-pokemon text-xs text-pkd-purple-1 stroke-pkd-purple-3 pl-1" style="-webkit-text-stroke: 3px var(--color-pkd-purple-3); paint-order: stroke fill;">{pokemon.id.toString().padStart(4, '0')}</p>
          <div class="absolute bg-pkd-purple-3 h-[40%] w-full top-[63%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xs"></div>
        </span>
        
        <p class="text-lg text-pkd-purple-6 font-semibold">{pokemon.name}</p>
      </div>
    </div>
  
    <button 
      class="text-gray-400 hover:text-gray-600 transition px-2 py-2 rounded-full cursor-pointer"
      on:click|stopPropagation={handleToggle}
    >
      {#if collected} ✅ {:else} ❌ {/if}
    </button>
  </div>