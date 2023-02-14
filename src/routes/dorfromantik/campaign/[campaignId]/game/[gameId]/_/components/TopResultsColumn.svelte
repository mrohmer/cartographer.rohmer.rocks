<script lang="ts">
    import NumberInput from '$lib/components/controls/input/NumberInput.svelte';

    export let upperValue: number;
    export let lowerValue: number;
</script>

<div class="p-1">
    <div><slot /></div>
    <div>
        <NumberInput bind:value={upperValue} min={0} max={100} on:input/>
    </div>
    <div>
        <NumberInput bind:value={lowerValue} min={0} max={100} on:input/>
    </div>
</div>
