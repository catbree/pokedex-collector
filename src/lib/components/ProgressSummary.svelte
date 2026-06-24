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
  
  <div class="max-w-4xl mx-auto flex flex-col gap-2 py-3">
    <div class="w-full h-5 flex overflow-hidden bg-pkd-cream-2 border-[3px] border-pkd-ink rounded-[3px]">
      <!-- regular poké balls -->
      <div class="bg-pkd-shell" style="width: {pokePct}%; box-shadow: inset 0 -4px 0 0 var(--color-pkd-shell-3);"></div>
      <!-- master balls / favourites -->
      <div class="bg-pkd-master rounded-r-[3px]" style="width: {masterPct}%; box-shadow: inset 0 -4px 0 0 var(--color-pkd-master-3);"></div>
    </div>

    <div class="flex items-center justify-between text-xs font-pokemon text-pkd-ink">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1">
          <img src="/icons/pokeball.svg" alt="Poké Ball" class="w-6 h-6" />
          {pokeballCount}
        </span>
        <span class="flex items-center gap-1">
          <img src="/icons/masterball.svg" alt="Master Ball" class="w-6 h-6" />
          {masterballCount}
        </span>
      </div>
      <span class="text-pkd-green">{total}/{max} ({totalPct}%)</span>
    </div>
  </div>