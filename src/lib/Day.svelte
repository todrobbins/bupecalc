<script lang="ts">
	import Strips from '$lib/Strips.svelte';
	export let day: number;
	export let startDate: Date;
	export let dose: number;
	export let freq: number;
	export let drug: string;

	let date: Date = new Date();
	$: date = new Date(date.setDate(new Date(startDate).getDate() + day));

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

	let strips: { shape: [number, number]; stripProportion: number }[] = [];
	$: strips = new Array(Math.ceil(numStrips)).fill(0).map((_value, i) => {
		return { shape: stripShapes[drug], stripProportion: Math.min(numStrips - i, 1) };
	});
</script>

<div class="day">
	<h3>
		Day {day} ({date.toLocaleDateString()}):
	</h3>

	<input class="dosage" bind:value={dose} /> mg
	<select bind:value={drug}>
		{#each drugChoices as drugChoice}
			<option value={drugChoice}>
				{drugChoice}
			</option>
		{/each}
	</select>
	({numStrips} strips)
	<input class="frequency" type="number" bind:value={freq} min="1" max="3" />x/day (total dose {totalDose}
	mg)
	<Strips {strips} />
</div>

<style>
	input.dosage {
		width: 4em;
	}

	input.frequency {
		width: 3em;
	}
</style>
