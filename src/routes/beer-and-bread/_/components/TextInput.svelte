<script lang="ts">
    export let id: string;
    export let name: string|undefined = undefined;
    export let placeholder: string | undefined = undefined;
    export let value: string|undefined;

</script>

<style lang="postcss">
    ::placeholder {
        @apply text-gray-600 opacity-100;
    }
</style>

<input class="text-center w-full text-xl p-1" type="text" {id} name={name ?? id} bind:value {placeholder} on:change on:input />
