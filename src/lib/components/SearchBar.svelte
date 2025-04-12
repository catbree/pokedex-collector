<script>
    export let pokedex = [];
    let searchTerm = '';
    let showInfo = false;
  
    function scrollToPokemon() {
      const match = pokedex.find(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.id.toString() === searchTerm
      );
  
      if (match) {
        const el = document.getElementById(`pokemon-${match.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('highlight');
          setTimeout(() => el.classList.remove('highlight'), 1500);
        }
        searchTerm = ''; //ux: clear input on search match
      } else {
        alert('Pokémon not found!');
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  </script>
  
  <div class="max-w-4xl mx-auto flex justify-between gap-2 sticky top-0 z-10 backdrop-blur py-2 -mt-2 -pl-2">
    <button class="cursor-pointer hover:animate-[wiggle_0.3s] hover:bg-pkd-white-a40 hover:rounded-full" on:click={() => {showInfo=true;}}>
      <img src="/icons/masterball.svg" alt="A masterball." class="w-12 h-12" />
    </button>
    <div class="flex flex-grow border border-pkd-pink-3 bg-pkd-pink-4 border-2 focus-within:border-white hover:bg-pkd-pink-3">
      <input
      bind:value={searchTerm}
      placeholder="Search 'ditto' or '132'"
      class="bg-pkd-white-a0 border-0 w-full font-pokemon text-xs text-pkd-white-a100 placeholder-pkd-white-a100 border-transparent focus:border-transparent focus:ring-0"
      on:keydown={(e) => { if (e.key === 'Enter') {
        scrollToPokemon();
      }}}
    />
      <button on:click={scrollToPokemon} class="text-pkd-white-a100" aria-label="Search"><img src="/icons/search-white.svg" alt="search" class="fill-white"></button>
    </div>
    <button on:click={scrollToTop} class="w-12 h-12 bg-pkd-pink-4 border-2 border-pkd-pink-3 cursor-pointer hover:bg-pkd-pink-3"><img class="w-full h-full" src="/icons/arrow-up-white.svg" alt="arrow-up icon"/></button>
  </div>

  {#if showInfo}
    <div role="button" tabindex="0" on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showInfo = false;
      }}} 
      on:click={() => showInfo = false} class="fixed top-0 left-0 w-full h-full z-100 bg-pkd-green-6/90 text-pkd-white-a100 flex items-center justify-center">
      <div on:click|stopPropagation aria-hidden="true" class="bg-pkd-purple-1 text-pkd-purple-6 font-pokemon text-2xs w-full max-w-xl px-4 sm:px-8 py-4 sm:py-6 rounded m-2 sm:m-4 overflow-y-auto max-h-[90vh]">
        <div class="flex flex-row justify-between mb-2 items-center">
          <h2 class="text-sm">ABOUT</h2>
          <button on:click={() => showInfo = false} class="hover:bg-pkd-purple-2 cursor-pointer"><img class="w-full h-full" src="/icons/cross.svg" alt="cross icon"/></button>
        </div>
          <p class="mb-4 text-white border-pkd-pink-3 bg-pkd-pink-4 border-2 p-3">Note: Your progress is saved in this browser only. Clearing your cache will reset everything!</p>
          <p class="mb-4">If you're looking for something simple to check off your full Pokemon National Pokedex collection (currently: 1025) and browse available cards, this may work for you!</p>
          <p class="mb-4">To start, tap a Pokéball to mark something as collected. Click on a Pokémon to view all of its available cards.</p>
          <p class="mb-4">
            Credit goes to <a href="https://developer.tcgplayer.com/" target="_blank" rel="noopener noreferrer" class="underline">TCGplayer API</a> and <a href="https://pokemontcg.io/" target="_blank" rel="noopener noreferrer" class="underline">Pokémon TCG API</a> for data, <a href="https://www.dafont.com/pkmn-rbygsc.font" target="_blank" rel="noopener noreferrer" class="underline">dafont.com</a> for fonts, and <a href="https://www.nintendo.com/" target="_blank" rel="noopener noreferrer" class="underline">Nintendo</a>, <a href="https://www.gamefreak.co.jp/" target="_blank" rel="noopener noreferrer" class="underline">Game Freak</a>, and <a href="https://www.pokemon.com/" target="_blank" rel="noopener noreferrer" class="underline">The Pokémon Company</a> for Pokémon.
          </p>
          <p class="mb-2">Passion project built and designed by <a href="https://leunghoicheng.com" target="_blank" rel="noopener noreferrer" class="underline">catbree</p>
          <div class="fixed bottom-4 right-4 flex flex-row gap-2">
            <button
            on:click={() => {
              const data = JSON.stringify(localStorage);
              navigator.clipboard.writeText(data)
                .then(() => alert('Copied to clipboard!'))
                .catch(() => alert('Failed to copy.'));
            }}
            class="bg-pkd-white-a40 border-2 border-pkd-white-a100 px-4 py-2 text-white cursor-pointer hover:bg-pkd-pink-3 hover:border-pkd-pink-3 z-50"
          >
            Export Progress
          </button>
          <button
          class="bg-pkd-white-a40 border-2 border-pkd-white-a100 px-4 py-2 text-white cursor-pointer hover:bg-pkd-pink-3 hover:border-pkd-pink-3 z-50"
          on:click={async () => {
            try {
              const text = await navigator.clipboard.readText();
              const data = JSON.parse(text);
              Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
              alert('Progress imported! Reloading...');
              location.reload(); // optional but helpful
            } catch (e) {
              alert('Failed to import. Make sure you copied valid data.');
            }
          }}
        >
          Import Progress
        </button>
            </div>
            
      </div>
    </div>
  {/if}