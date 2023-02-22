<script lang="ts">
  import Node from "./Node.svelte";
    let klass: string;

  export {klass as class};
</script>

<Node class={klass}>
    start
</Node>
