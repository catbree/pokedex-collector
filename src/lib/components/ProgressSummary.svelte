<script>
    import { getCollectionStates } from "$lib/services/StorageService";

    let pokeballCount = $state(0);
    let masterballCount = $state(0);
    let totalBallCount = $state(0);

    //Recalculate whenever collection updates
    $effect(() => {
        const pokemonStates = getCollectionStates();
        pokeballCount = Object.values(pokemonStates).filter(v => v === 1).length;
        masterballCount = Object.values(pokemonStates).filter(v => v === 2).length;
        totalBallCount = pokeballCount + masterballCount;
    })
    
    let max = 1025;
    let totalBallPercentage = $derived(Math.round((totalBallCount/max)*100));


</script>

<div class="max-w-4xl mx-auto flex items-center gap-2 py-3 px-1">
    <div class="flex-grow bg-pkd-white-a40 rounded-full h-4 border-2 border-pkd-purple-1">
        <div class="bg-pkd-purple-4 h-full rounded-full" style="width: {totalBallPercentage}%;)"></div>
    </div>
    <p class="font-pokemon text-xs text-pkd-white-a100">{totalBallCount}/{max} ({totalBallPercentage}%)</p>
</div>
