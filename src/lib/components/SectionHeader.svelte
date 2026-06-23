<script>
    export let left = '';
    export let right = '';
</script>
<div class="max-w-4xl mx-auto bg-pkd-green flex justify-between p-2 font-pokemon text-xs text-pkd-cream">
    <span>{left}</span>
    {#if right !== null}
        <span>{right}</span>
    {/if}
</div>