<script>
    import { getUpdatedCollectedSet } from "$lib/utils/collectionUtils";

    let current = $state(getUpdatedCollectedSet().size);
    //Recalculate whenever collection updates
    $effect(() => {
        current = getUpdatedCollectedSet().size;
    })
    
    let max = 1025;
    let percentage = $derived(Math.round((current/max)*100));


</script>

<div class="max-w-4xl mx-auto flex items-center gap-2 py-3 px-1">
    <div class="flex-grow bg-pkd-white-a40 rounded-full h-4 border-2 border-pkd-purple-1">
        <div class="bg-pkd-purple-4 h-full rounded-full" style="width: {percentage}%;)"></div>
    </div>
    <p class="font-pokemon text-xs text-pkd-white-a100">{current}/{max} ({percentage}%)</p>
</div>
