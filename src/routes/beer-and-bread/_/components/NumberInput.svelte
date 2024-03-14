<script lang="ts">
  export let id: string;
  export let name: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let value: number | undefined;

</script>

<input class="text-center w-full" type="number" {id} name={name ?? id} bind:value {placeholder} on:change on:input />
