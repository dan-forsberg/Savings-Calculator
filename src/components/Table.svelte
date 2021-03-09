<script lang="ts">
import calculatorStore from "../calculatorStore";
import type ISavings from "../scripts/ISavings";
import TableRow from "./TableRow.svelte";
export let maxTableLength = 10;

let selectedSavings = [];
calculatorStore.subscribe((newCalc) => {
	let allSavings = newCalc.calculateSavings();
	selectedSavings = selectSavings(allSavings);
});

function selectSavings(allSavings: ISavings[]) {
	let everyNthRow = 1;
	let end = allSavings.length - 1;
	if (allSavings.length > maxTableLength) {
		everyNthRow = Math.round(allSavings.length / maxTableLength);
	}

	return allSavings.filter((_, index) => index == 0 || index % everyNthRow == 0 || index == end);
}
</script>

<table id="savingsTable">
	<thead>
		<tr>
			<th>År</th>
			<th>Med avkastning</th>
			<th>Utan avkastning</th>
			<th>Skillnad i %</th>
		</tr>
	</thead>
	<tbody>
		{#each selectedSavings as saving, index}
			<TableRow {saving} {index} />
		{/each}
	</tbody>
</table>
