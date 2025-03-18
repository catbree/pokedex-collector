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

<div class="max-w-4xl mx-auto mt-2 mb-8 p-4 border border-gray-200">
    <div class="flex justify-between pb-2">
        <p>Completion</p>
        <p>{current}/{max} ({percentage}%)</p>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {percentage}%"></div>
    </div>
</div>
