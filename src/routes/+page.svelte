<script lang="ts">
	import Day from '$lib/Day.svelte';

	let days = [
		{ dose: 0.5, freq: 2, drug: 'belbuca', stopOtherOpioids: false },
		{ dose: 1, freq: 3, drug: 'suboxone 2mg', stopOtherOpioids: false },
		{ dose: 2, freq: 2, drug: 'suboxone 4mg', stopOtherOpioids: false }
	];

	let startDate = new Date();

	function addDay() {
		let lastDay = days[days.length - 1];
		days = [...days, { ...lastDay }];
	}

	function toggleStop(dayNum: number) {
		let day = days[dayNum];
		day.stopOtherOpioids = !day.stopOtherOpioids;
		days = days.map((d, i) => {
			if (day.stopOtherOpioids) {
				return { dose: d.dose, freq: d.freq, drug: d.drug, stopOtherOpioids: i >= dayNum };
			}
			return { dose: d.dose, freq: d.freq, drug: d.drug, stopOtherOpioids: false };
		});
		console.log(days);
	}
	/*
  Styling TODOs:
  * make this landscape orientation
  * add morning/evening/afternoon rows 
  
	// show total amt for each drug over whole course

	// set which day is the last full agonist day

	// include synopsis

  */
</script>

<div class="content">
	<h1>BupeCalc</h1>
	<div class="start-date no-print">
		Start date:<input class="start-date" type="date" bind:value={startDate} />
	</div>
	{#each days as day, i}
		<Day
			day={i}
			bind:startDate
			bind:drug={day.drug}
			bind:dose={day.dose}
			bind:freq={day.freq}
			bind:stopOtherOpioids={day.stopOtherOpioids}
			{toggleStop}
		/>
	{/each}

	<button class="no-print add-day" on:click={addDay}>Add day</button>
</div>

<style>
	* {
		box-sizing: border-box;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	div.content {
		width: 60em;
		margin: auto;
		padding: 2em;
		height: 100%;
	}

	@media print {
		.no-print,
		.no-print * {
			display: none !important;
		}
	}

	button.add-day {
		width: 12em;
		height: 2em;
		font-size: 18pt;
	}
</style>
