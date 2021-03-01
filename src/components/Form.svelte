<script lang="ts">
import Calculator from "../scripts/calculator";
import calculator from "../calculatorStore";

import { onMount } from "svelte";

let startCapital = 10000,
	monthlySavings = 250,
	savingsPeriod = 40,
	yearlyProfit = 7,
	schIncAmount = 100,
	schIncPeriod = 5;

onMount(() => {
	update();
});

function update() {
	// change 7 -> 1.07
	let profit = 1 + yearlyProfit / 100;
	calculator.set(
		new Calculator(
			startCapital,
			savingsPeriod,
			monthlySavings,
			profit,
			schIncPeriod,
			schIncAmount
		)
	);
}
</script>

<form
	on:submit|preventDefault={() => {
		update();
	}}>
	<label for="startCapital">Startkapital</label>
	<input name="startCapital" type="number" min="0" bind:value={startCapital} />

	<label for="monthlySavings">Månadsparande</label>
	<input name="monthlySavings" type="number" min="0" bind:value={monthlySavings} />

	<label for="period">Antal år: {savingsPeriod}</label>
	<input name="period" type="range" min="1" max="100" step="1" bind:value={savingsPeriod} />

	<label for="profit">Avkastning per år: {yearlyProfit}%</label>
	<input name="profit" type="range" min="0" max="50" step="0.5" bind:value={yearlyProfit} />

	<label for="schIncPer">Vart {schIncPeriod} år ökar månadssparandet...</label>
	<input name="schIncPer" type="number" min="0" max="100" bind:value={schIncPeriod} />

	<label for="schInc">...med {schIncAmount} kr</label>
	<input name="schInc" type="number" min="0" bind:value={schIncAmount} />

	<input class="btn-small" id="submit" type="submit" value="Räkna" />
</form>
