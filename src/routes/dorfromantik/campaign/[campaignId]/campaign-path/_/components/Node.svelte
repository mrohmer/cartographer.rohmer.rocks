<script lang="ts">
  let klass: string;

  export {klass as class};
</script>
<div class="flex justify-center items-center h-10 border-black border rounded px-2 {klass}">
    <slot />
</div>
