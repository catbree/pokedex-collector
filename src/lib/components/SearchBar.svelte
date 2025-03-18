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
        }
      } else {
        alert('Pokémon not found!');
      }
    }
  </script>
  
  <div class="max-w-4xl mx-auto flex mb-4">
    <input
      bind:value={searchTerm}
      placeholder="Search Pokémon by name or ID"
      class="border p-2 rounded w-64 mr-2"
      on:keydown={(e) => { if (e.key === 'Enter') scrollToPokemon(); }}
    />
    <button on:click={scrollToPokemon} class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
  </div>