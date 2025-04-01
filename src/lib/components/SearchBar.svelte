<script>
    export let pokedex = [];
    let searchTerm = '';
  
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
      } else {
        alert('Pokémon not found!');
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  </script>
  
  <div class="max-w-4xl mx-auto flex justify-between gap-2 sticky top-0 z-10 backdrop-blur py-2 -mt-2 -pl-2">
    <img src="/icons/masterball.svg" alt="It's a master ball" class="w-12 h-12" />
    <div class="flex flex-grow border border-pkd-pink-3 bg-pkd-pink-4 border-2 focus-within:border-white hover:bg-pkd-pink-3">
      <input
      bind:value={searchTerm}
      placeholder="Search 'ditto' or '132'"
      class="bg-pkd-white-a0 border-0 w-full font-pokemon text-xs text-pkd-white-a100 placeholder-pkd-white-a100 border-transparent focus:border-transparent focus:ring-0"
      on:keydown={(e) => { if (e.key === 'Enter') scrollToPokemon(); }}
    />
      <button on:click={scrollToPokemon} class="text-pkd-white-a100" aria-label="Search"><img src="/icons/search-white.svg" alt="search" class="fill-white"></button>
    </div>
    <button on:click={scrollToTop} class="w-12 h-12 bg-pkd-pink-4 border-2 border-pkd-pink-3 cursor-pointer hover:bg-pkd-pink-3"><img class="w-full h-full" src="/icons/arrow-up-white.svg" alt="arrow-up icon"/></button>
  </div>