<script lang="ts">
	import Day from '$lib/Day.svelte';

	let days = [
		{ dose: 0.5, freq: 2, drug: 'belbuca' },
		{ dose: 1, freq: 3, drug: 'suboxone 2mg' },
		{ dose: 2, freq: 2, drug: 'suboxone 4mg' }
	];

	let startDate = new Date();

	function addDay() {
		let lastDay = days[days.length - 1];
		days = [...days, { ...lastDay }];
	}

	// Style Days - add chakra

	// add drug visualizer

	// set start date

	// show total amt for each drug over whole course

	// set which day is the last full agonist day

	// include synopsis
</script>

<h1>BupeCalc</h1>
{#each days as day, i}
	<Day day={i + 1} {startDate} bind:drug={day.drug} bind:dose={day.dose} bind:freq={day.freq} />
{/each}

<button on:click={addDay}>Add day</button>

{JSON.stringify(days)}

<style>
	* {
		box-sizing: border-box;
	}
</style>
