<script lang="ts">
	import Strip from '$lib/Strip.svelte';

	export let strips: { shape: [number, number]; numTiles: number }[];
</script>

<div class="strips">
	{#each strips as strip}
		<Strip bind:shape={strip.shape} bind:numTiles={strip.numTiles} />
	{/each}
</div>
