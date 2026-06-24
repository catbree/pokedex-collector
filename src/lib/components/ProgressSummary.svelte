<script>
    import { collectionStates } from "$lib/services/StorageService";

    const max = 1025;
    const pct = (n) => Math.min(100, Math.round((n / max) * 100));

    // Derived straight from the shared store, so counts update automatically
    // when toggles happen or the cloud collection finishes loading.
    let pokeballCount   = $derived(Object.values($collectionStates).filter(v => v === 1).length);
    let masterballCount = $derived(Object.values($collectionStates).filter(v => v === 2).length);
    let total           = $derived(pokeballCount + masterballCount);
    let pokePct   = $derived(pct(pokeballCount));
    let masterPct = $derived(pct(masterballCount));
    let totalPct  = $derived(pct(total));
  </script>
  
  <div class="max-w-4xl mx-auto flex flex-wrap items-center gap-3 py-3 px-1">
    <div class="flex flex-grow min-w-[140px] h-4 overflow-hidden bg-pkd-cream-2 border-[3px] border-pkd-ink" style="box-shadow: inset 2px 2px 0 rgba(0,0,0,.12);">
      <!-- regular poké balls -->
      <div class="bg-pkd-shell" style="width: {pokePct}%"></div>
      <!-- master balls / favourites -->
      <div class="bg-pkd-lens" style="width: {masterPct}%"></div>
    </div>

    <div class="flex items-center gap-3 text-2xs font-pokemon text-pkd-ink">
      <span class="flex items-center gap-1">
        <img src="/icons/pokeball.svg" alt="Poké Ball" class="w-5 h-5" />
        {pokeballCount}
      </span>
      <span class="flex items-center gap-1">
        <img src="/icons/masterball.svg" alt="Master Ball" class="w-5 h-5" />
        {masterballCount}
      </span>
      <span class="ml-2 text-pkd-green">{total}/{max} ({totalPct}%)</span>
    </div>
  </div>