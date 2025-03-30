<script>
    export let left = '';
    export let right = '';
</script>
<div class="max-w-4xl mx-auto bg-pkd-green-6 flex justify-between p-2 font-pokemon text-xs text-pkd-white-a100">
    <span>{left}</span>
    {#if right !== null}
        <span>{right}</span>
    {/if}
</div>