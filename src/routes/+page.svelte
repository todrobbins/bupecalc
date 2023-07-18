<script>
  import Day from '$lib/Day.svelte'

  let doses = [
    {dose: 25, freq: 2},
    {dose: 25, freq: 3},
    {dose: 50, freq: 2}
  ];

  let startDate = new Date()

  // need to be able to override the doses by clicking on each element
  // need to visualize
  // need to add different drug types
  // need to style
</script>
<h1>BupeCalc</h1>
{#each doses as dose, i}
  <Day day={i + 1} {startDate} dose={dose.dose} freq={dose.freq}/>
{/each}
