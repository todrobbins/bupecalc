<script lang="ts">
	import Strips from '$lib/Strips.svelte';
	export let day: number;
	export let startDate: Date;
	export let dose: number;
	export let freq: number;
	export let drug: string;

	let date = new Date(startDate);
	date.setDate(startDate.getDate() + day);

	const fullStripMilligrams: { [id: string]: number } = {
		belbuca: 0.25,
		'suboxone 2mg': 2,
		'suboxone 4mg': 4,
		'suboxone 8mg': 8
	};

	const drugChoices = Object.keys(fullStripMilligrams);

	const stripShapes: { [id: string]: [number, number] } = {
		belbuca: [2, 2],
		'suboxone 2mg': [2, 4],
		'suboxone 4mg': [2, 4],
		'suboxone 8mg': [2, 4]
	};

	$: totalDose = dose * freq;
	$: numStrips = dose / fullStripMilligrams[drug];

	let strips: { shape: [number, number]; numTiles: number }[] = [];

	$: {
		strips = [
			{ shape: stripShapes[drug], numTiles: 8 },
			{ shape: stripShapes[drug], numTiles: 8 },
			{ shape: stripShapes[drug], numTiles: 5 }
		];
		for (let i = 0; i < strips.length; i++) {
			console.log('reassigning', strips[i]);
			strips[i] = strips[i];
		}
	}
</script>

<div>
	<h3>
		Day {day} ({date.toLocaleDateString()}):
	</h3>

	{JSON.stringify(strips)}

	<input bind:value={dose} /> mg ({numStrips} strips
	<select bind:value={drug}>
		{#each drugChoices as drugChoice}
			<option value={drugChoice}>
				{drugChoice}
			</option>
		{/each}
	</select>
	)
	<input type="number" bind:value={freq} min="1" max="3" />x/day (total dose {totalDose} mg)
	<Strips {strips} />
</div>

<style>
</style>
