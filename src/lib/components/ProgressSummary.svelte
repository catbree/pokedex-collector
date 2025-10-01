<script>
    import { getCollectionStates } from "$lib/services/StorageService";
  
    let pokeballCount = $state(0);
    let masterballCount = $state(0);
    let total = $derived(pokeballCount + masterballCount);
  
    const max = 1025;
  
    const pct = (n) => Math.min(100, Math.round((n / max) * 100));
    let pokePct   = $derived(pct(pokeballCount));
    let masterPct = $derived(pct(masterballCount));
    let totalPct  = $derived(pct(total));
  
    // recalc when storage changes
    $effect(() => {
      const states = getCollectionStates();
      pokeballCount   = Object.values(states).filter(v => v === 1).length;
      masterballCount = Object.values(states).filter(v => v === 2).length;
    });
  </script>
  
  <div class="max-w-4xl mx-auto flex items-center gap-3 py-3 px-1">
    <div class="flex-grow bg-pkd-white-a40 rounded-full h-4 border-2 border-pkd-purple-1 overflow-hidden">
      <div class="h-full flex">
        <!-- regular poké balls -->
        <div class="bg-pkd-pink-4" style="width: {pokePct}%"></div>
        <!-- master balls -->
        <div class="bg-pkd-purple-4" style="width: {masterPct}%"></div>
      </div>
    </div>
  
    <div class="flex items-center gap-3 text-xs font-pokemon text-pkd-white-a100">
      <span class="flex items-center gap-1">
        <div class="w-6 h-6 bg-pkd-white-a0 rounded-full border-1 border-pkd-white-a0 flex items-center justify-center">
          <img src="/icons/pokeball.svg" alt="Poké Ball" class="w-full h-full" />
        </div>
        {pokeballCount}
      </span>
      <span class="flex items-center gap-1">
        <div class="w-6 h-6 bg-pkd-white-a0 rounded-full border-1 border-pkd-white-a0 flex items-center justify-center">
          <img src="/icons/masterball.svg" alt="Master Ball" class="w-full h-full" />
        </div>
        {masterballCount}
      </span>
      <span class="ml-2">{total}/{max} ({totalPct}%)</span>
    </div>
  </div>