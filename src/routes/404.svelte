<script lang="ts" context="module">
    export const prerender = true;
</script>
<script lang="ts">
  import Error from "$lib/components/Error.svelte";
</script>

<Error status={404}/>
