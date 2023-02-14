<script lang="ts">
  import NumberInput from '$lib/components/controls/input/NumberInput.svelte';

  export let value: number;
  export let locked = true;
</script>


<div class="flex" class:opacity-20={locked} class:pointer-events-none={locked}>
    <div class="flex-1">
        <slot/>
    </div>
    <div class="w-10">
        <NumberInput bind:value min={0} max={100}
                     on:input>
        </NumberInput>
    </div>
</div>
