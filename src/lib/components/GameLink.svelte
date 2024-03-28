<script lang="ts">
  export let href: string;
  export let title: string;

  let klass: string;
  export { klass as class };
</script>
<a {href} {title} aria-label={title} class="block px-5 py-8 rounded-xl border border-gray-400 overflow-hidden transition-transform hover:scale-[1.02] {klass}">
    <slot />
</a>
