<script lang="ts">
	import Strips from '$lib/Strips.svelte';
	import { STRIP_TYPES } from '$lib/StripType';
	export let day: number;
	export let startDate: Date;
	export let dose: number;
	export let freq: number;
	export let drug: string;
	export let stopOtherOpioids: boolean;
	export let toggleStop: Function;
	export let removeDay: Function;

	$: date = new Date(new Date(startDate).setDate(new Date(startDate).getUTCDate() + day));

	console.log(STRIP_TYPES);

	const drugChoices = Object.keys(STRIP_TYPES);

	$: totalDose = dose * freq;
	$: numStrips = dose / STRIP_TYPES[drug].fullStripDose;

	let strips: { shape: [number, number]; stripProportion: number }[] = [];
	$: strips = new Array(Math.ceil(numStrips)).fill(0).map((_value, i) => {
		return { shape: STRIP_TYPES[drug].shape, stripProportion: Math.min(numStrips - i, 1) };
	});

	let dayToggler = () => toggleStop(day);
	let removeSelf = () => removeDay(day);
</script>

<div class="day">
	<h3>
		Day {day + 1} ({date.toLocaleDateString()})
	</h3>
	<div class="no-print">
		<button class="remove-self" on:click={removeSelf}>✕</button>
	</div>
	<div class="stop-other-opioids {stopOtherOpioids ? 'stop' : 'keep'}" on:click={dayToggler}>
		{stopOtherOpioids ? 'Stop' : 'Keep'} taking other opioids
	</div>

	<div class="dosage">
		<input class="dosage" bind:value={dose} /> mg
		<select class="drug" bind:value={drug}>
			{#each drugChoices as drugChoice}
				<option value={drugChoice}>
					{drugChoice}
				</option>
			{/each}
		</select>
		<br />
		({numStrips}
		{numStrips == 1 ? STRIP_TYPES[drug].formSingle : STRIP_TYPES[drug].formPlural})
	</div>
	<div class="frequency">
		<input class="frequency" type="number" bind:value={freq} min="1" max="3" />x/day
		<br />(total dose {totalDose} mg)
	</div>
	<Strips {strips} {freq} {drug} />
</div>

<style>
	h3 {
		margin-bottom: 0;
	}

	div.day {
		width: 12em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: relative;
		padding: 0.5em;
	}

	input.dosage {
		width: 2.5em;
	}

	input.frequency {
		width: 2.5em;
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

	button.remove-self {
		position: absolute;
		top: 1em;
		right: 0.5em;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		color: gray;
	}

	button.remove-self:hover {
		color: red;
		text-decoration-line: underline;
	}

	@media print {
		.no-print,
		.no-print * {
			display: none !important;
		}

		input,
		select {
			font-weight: bold;
			border: none;
			background-color: rgba(0, 0, 0, 0);
			appearance: none;
		}

		input {
			-webkit-appearance: none;
			-moz-appearance: textfield;
		}

		div.day {
			display: inline-block;
			line-height: 1.5em;
		}
	}
</style>
