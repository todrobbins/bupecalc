<script lang="ts">
	import Strips from '$lib/Strips.svelte';
	export let day: number;
	export let startDate: Date;
	export let dose: number;
	export let freq: number;
	export let drug: string;
	export let stopOtherOpioids: boolean;
	export let toggleStop: Function;

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

	let dayToggler = () => toggleStop(day);
</script>

<div class="day">
	<h3>
		Day {day + 1} ({date.toLocaleDateString()}):
	</h3>
	<div class="stop-other-opioids {stopOtherOpioids ? 'stop' : 'keep'}" on:click={dayToggler}>
		{stopOtherOpioids ? 'Stop' : 'Keep'} taking other opioids
	</div>

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

	div.stop-other-opioids {
		font-style: italic;
		font-weight: bold;
	}

	div.stop-other-opioids:hover {
		text-decoration-line: underline;
	}

	div.stop {
		color: maroon;
	}

	div.keep {
		color: green;
	}
</style>
