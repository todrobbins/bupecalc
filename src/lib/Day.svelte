<script lang="ts">
  export let day: number;
  export let startDate: Date;
  export let dose: number;
  export let freq: number;
  export let drug: string;

  let date = new Date(startDate);
  date.setDate(startDate.getDate() + day);


  const fullStripMilligrams: { [id: string]: number } = {
    "belbuca": 0.25,
    "suboxone 2mg": 2,
    "suboxone 4mg": 4,
    "suboxone 8mg": 8,
  };

  const drugChoices = Object.keys(fullStripMilligrams);

  $: totalDose = dose * freq;
  $: stripAmount = dose / fullStripMilligrams[drug];
</script>

<div>
  Day {day} ({date.toLocaleDateString()}):
  <input bind:value={dose} /> mg ({stripAmount} strips
	<select bind:value={drug}>
		{#each drugChoices as drugChoice}
			<option value={drugChoice}>
				{drugChoice}
			</option>
		{/each}
	</select>
  )
  <input bind:value={freq} />x/day (total dose {totalDose} mg)
</div>