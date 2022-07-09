<script lang="ts">
	export let disabled;
	export let type = 'button';
	export let href: string;
	let klass: string;

	export { klass as class };
</script>

<style lang="postcss">
	.btn {
		@apply w-full bg-transparent border border-black rounded text-black transition-colors cursor-pointer py-2.5 px-4 mr-1 mb-1 active:bg-black active:text-white active:dark:text-zinc-900 text-center;
	}
	.btn[disabled] {
			@apply opacity-30;
	}
</style>
{#if href}
	<a on:click
		 {disabled}
		 {href}
		 class="btn block {klass}">
		<slot />
	</a>
{:else}
	<button on:click
					{disabled}
					{type}
					class="btn {klass}">
		<slot />
	</button>
{/if}
