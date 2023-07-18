<script>
  export let day;
  export let startDate;
  export let dose;
  export let freq;
  
  let date = new Date(startDate);
  date.setDate(startDate.getDate() + day);
  $: totalDose = dose * freq
</script>

<div>
  Day {day} ({date.toLocaleDateString()}): {dose} mg {freq}x/day (total dose {totalDose} mg)
</div>