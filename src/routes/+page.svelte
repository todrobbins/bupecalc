<script lang="ts">
	import Day from '$lib/Day.svelte';

	let days = [
		{ dose: 0.5, freq: 2, drug: 'belbuca', stopOtherOpioids: false },
		{ dose: 1, freq: 3, drug: 'suboxone 2mg', stopOtherOpioids: false },
		{ dose: 2, freq: 2, drug: 'suboxone 4mg', stopOtherOpioids: false }
	];

	let startDate = new Date();

	function addDay() {
		if (days.length === 0) {
			days = [{ dose: 0.5, freq: 2, drug: 'belbuca', stopOtherOpioids: false }];
			return;
		}
		let lastDay = days[days.length - 1];
		days = [...days, { ...lastDay }];
	}

	function removeDay(dayNum: number) {
		days.splice(dayNum, 1);
		days = days;
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

	// include synopsis
  */
</script>

<div class="content">
	<h1>BupeCalc</h1>
	<div class="start-date no-print">
		Start date:<input class="start-date" type="date" bind:value={startDate} />
	</div>
	<div class="days">
		{#each days as day, i}
			<Day
				day={i}
				bind:startDate
				bind:drug={day.drug}
				bind:dose={day.dose}
				bind:freq={day.freq}
				bind:stopOtherOpioids={day.stopOtherOpioids}
				{toggleStop}
				{removeDay}
			/>
		{/each}
		<button class="no-print add-day" on:click={addDay}><h1>Add day</h1></button>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	div.content {
		width: 100%;
		margin: auto;
		padding: 2em;
		height: 100%;
	}

	div.days {
		display: flex;
		flex-flow: row wrap;
		gap: 0.5em;
	}

	@media print {
		.no-print,
		.no-print * {
			display: none !important;
		}

		div.days {
			display: table;
		}
	}

	button.add-day {
		width: 16em;
		min-height: 20em;
	}
</style>
