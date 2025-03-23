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
  
  <div class="max-w-4xl mx-auto flex justify-between mb-4 sticky top-0 z-10 py-2 backdrop-blur">
    <div>
      <input
      bind:value={searchTerm}
      placeholder="Search Pokémon by name or ID"
      class="border p-2 rounded w-64 mr-2"
      on:keydown={(e) => { if (e.key === 'Enter') scrollToPokemon(); }}
    />
      <button on:click={scrollToPokemon} class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </div>
    <button on:click={scrollToTop} class="bg-gray-300 px-3 py-2 rounded cursor-pointer">⬆️</button>
  </div>