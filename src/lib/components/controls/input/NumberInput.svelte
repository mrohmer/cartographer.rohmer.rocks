<script lang="ts">

    export let value: number;
    export let id: string;
    export let max: number;
    export let min: number;
    export let step = 1;
</script>

<div class="w-full">
    <label for={id} class="block text-xs font-extralight"><slot /></label>
    <input {id}
           type="number"
           class="block w-full border-b border-stone-800"
           {max}
           {min}
           {step}
           bind:value={value}
           on:input />
</div>
