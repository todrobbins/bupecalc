<script lang="ts">
	import Strip from '$lib/Strip.svelte';

	export let strips: { shape: [number, number]; stripProportion: number }[];
</script>

<div class="strips">
	{#each strips as strip}
		<Strip bind:shape={strip.shape} bind:stripProportion={strip.stripProportion} />
	{/each}
</div>
