<script lang="ts">
    let klass: string;

    export {klass as class};
</script>
<div class="flex justify-center {klass}">
    <slot />
</div>
