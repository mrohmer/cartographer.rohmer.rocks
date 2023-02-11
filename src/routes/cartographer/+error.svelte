<script lang="ts">
    import {page} from "$app/stores";
    import Error from "./_/components/Error.svelte";
</script>

<Error status={$page.status}/>
