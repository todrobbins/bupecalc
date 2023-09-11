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
	{/each}
</div>

<style>
	div.strips {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	td.dose-label {
		width: 4em;
	}

	td.strip-viz-container {
		display: flex;
		flex-flow: row wrap;
		gap: 1em;
	}
</style>
