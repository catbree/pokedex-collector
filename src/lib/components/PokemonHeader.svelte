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
  
  <div class="flex items-center justify-between p-4 rounded-lg bg-white transition hover:bg-gray-200 cursor-pointer">
    <div class="flex items-center space-x-3">
      <img src="{pokemon.sprite}" alt="{pokemon.name}" class="w-10 h-10" />
      <div>
        <p class="text-gray-500 text-sm font-medium">#{pokemon.id.toString().padStart(4, '0')}</p>
        <p class="text-lg font-semibold">{pokemon.name}</p>
      </div>
    </div>
  
    <button 
      class="text-gray-400 hover:text-gray-600 transition px-2 py-2 rounded-full cursor-pointer"
      on:click|stopPropagation={handleToggle}
    >
      {#if collected} ✅ {:else} ❌ {/if}
    </button>
  </div>