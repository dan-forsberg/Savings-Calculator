<script lang="ts">
import type ISavings from "../scripts/ISavings";
export let saving: ISavings;
export let index: number;

let diffInProcent = Math.round((saving.resultWithProfit / saving.resultNoProfit) * 100);
let withProfit = formatNumberNicely(saving.resultWithProfit);
let noProfit = formatNumberNicely(saving.resultNoProfit);

// required to make sure that everything updates
$: {
	diffInProcent = Math.round((saving.resultWithProfit / saving.resultNoProfit) * 100);
	withProfit = formatNumberNicely(saving.resultWithProfit);
	noProfit = formatNumberNicely(saving.resultNoProfit);
}

function formatNumberNicely(value: number): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<tr>
	<td>{saving.year}</td>
	<td>{withProfit} kr</td>
	<td>{noProfit} kr</td>
	<td>{diffInProcent - 100}%</td>
	<td hidden>{index}</td>
</tr>
