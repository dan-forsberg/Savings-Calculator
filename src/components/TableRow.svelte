<script lang="ts">
import type ISavings from "../scripts/ISavings";
export let saving: ISavings;

let diffInProcent = Math.round((saving.resultWithProfit / saving.resultNoProfit) * 100);
let withProfit = formatNumberNicely(saving.resultWithProfit);
let noProfit = formatNumberNicely(saving.resultNoProfit);

function formatNumberNicely(value: number): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<tr>
	<td>{saving.year}</td>
	<td>{withProfit} kr</td>
	<td>{noProfit} kr</td>
	<td>{diffInProcent - 100}%</td>
</tr>
