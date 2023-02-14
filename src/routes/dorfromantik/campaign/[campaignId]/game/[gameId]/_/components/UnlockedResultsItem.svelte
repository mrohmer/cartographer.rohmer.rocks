<script lang="ts">
  import NumberInput from '$lib/components/controls/input/NumberInput.svelte';

  export let value: number;
  export let totalUnlocked = 0;
</script>


<div>
        <NumberInput bind:value min={0} max={100}
                     on:input>

            <slot/>
        </NumberInput>
</div>
