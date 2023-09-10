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

	/*
  Styling TODOs:
  * make the inputs look more 'inline'
  * make 2 columns?
  
  UI TODOs:
  * ableton-style dragging inputs

	// set start date

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
			day={i + 1}
			bind:startDate
			bind:drug={day.drug}
			bind:dose={day.dose}
			bind:freq={day.freq}
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
