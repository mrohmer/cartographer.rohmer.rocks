<script lang="ts">

    export let value: string;
    export let id: string;
    export let maxLength: number;;

    let internalValue: string;

    const updateIfDifferent = (v: string) => {
      if (v?.trim() !== internalValue?.trim()) {
        internalValue = v;
      }
    }
    $: updateIfDifferent(value);
</script>

<div class="w-full">
    <label for={id} class="block text-xs font-extralight"><slot /></label>
    <input {id}
           class="block w-full border-b border-stone-800"
           {maxLength}
           bind:value={internalValue}
           on:input/>
</div>
