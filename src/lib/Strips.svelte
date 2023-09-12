<script lang="ts">
	import Strip from '$lib/Strip.svelte';

	export let strips: { shape: [number, number]; stripProportion: number }[];
	export let freq: number;
	export let drug: string;

	const freqLabels = [['daily'], ['morning', 'evening'], ['morning', 'afternoon', 'evening']];
</script>

<div class="strips">
	{#each Array(freq) as _, i}
		<table class="daily-dose">
			<tr>
				<td class="dose-label">
					{freqLabels[freq - 1][i]}
				</td>
				<td class="strip-viz-container">
					{#each strips as strip}
						<Strip bind:shape={strip.shape} bind:stripProportion={strip.stripProportion} {drug} />
					{/each}
				</td>
			</tr>
		</table>
		{#if i < freq - 1}<hr />{/if}
	{/each}
</div>

<style>
	div.strips {
		display: flex;
		flex-direction: column;
	}

	td.dose-label {
		width: 4em;
	}

	td.strip-viz-container {
		display: flex;
		flex-flow: row wrap;
		gap: 0.5em;
	}

	hr {
		border: 0;
		border-top: 1px dashed rgba(0, 0, 0, 0.5);
		width: 100%;
	}
</style>
