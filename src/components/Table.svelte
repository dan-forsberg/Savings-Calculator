<script>
import calculatorStore from "../calculatorStore";
import TableRow from "./TableRow.svelte";
export let maxTableLength = 10;

let selectedSavings = [];
calculatorStore.subscribe((newCalc) => {
	let allSavings = newCalc.calculateSavings();

	let everyNthRow = 1;
	let end = allSavings.length - 1;
	if (allSavings.length > maxTableLength) {
		everyNthRow = Math.round(allSavings.length / maxTableLength);
	}

	selectedSavings = allSavings.filter(
		(_, index) => index == 0 || index % everyNthRow == 0 || index == end
	);

	// force svelte to update
	selectedSavings = selectedSavings;
});
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
		{#each selectedSavings as saving}
			<TableRow {saving} />
		{/each}
	</tbody>
</table>
