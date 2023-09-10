<script lang="ts">
	export let shape: [number, number];
	export let numTiles: number;

	let nRows = shape[0];
	let nCols = shape[1];
	let totalTiles = nRows * nCols;

	let rows: number[][] = [];
	for (let i = 0; i < nRows; i++) {
		let row = [];
		for (let j = 0; j < nCols; j++) {
			row.push(j * nRows + i < numTiles);
		}
		rows.push(row);
	}
</script>

<div>
	<table>
		{#each rows as row}
			<tr>
				{#each row as cell}
					<td class={cell ? 'used' : 'unused'} />
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	table {
		border-collapse: collapse;
		border-style: solid;
		border-width: 1px;
		margin: 1em;
	}
	td {
		width: 1em;
		height: 1em;
		border-style: dotted;
		border-width: 1px;
		padding: 0;
	}
	td.used {
		background-color: grey;
	}
</style>
