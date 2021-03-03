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
	<div class="input-field">
		<label class="active" for="startCapital">Startkapital</label>
		<input id="startCapital" type="number" min="0" bind:value={startCapital} />
	</div>

	<div class="input-field">
		<label class="active" for="monthlySavings">Månadsparande</label>
		<input id="monthlySavings" type="number" min="0" bind:value={monthlySavings} />
	</div>
	<div class="input-field">
		<label class="active" for="period">Antal år: </label>
		<input id="period" type="number" min="1" max="100" step="1" bind:value={savingsPeriod} />
	</div>
	<div class="input-field">
		<label class="active" for="profit">Avkastning per år: {yearlyProfit}%</label>
		<input id="profit" type="number" min="0" max="50" step="0.5" bind:value={yearlyProfit} />
	</div>
	<div class="input-field">
		<label class="active" for="schIncPer">Vart {schIncPeriod} år ökar månadssparandet...</label>
		<input id="schIncPer" type="number" min="0" max="100" bind:value={schIncPeriod} />
	</div>
	<div class="input-field">
		<label class="active" for="schInc">...med {schIncAmount} kr</label>
		<input id="schInc" type="number" min="0" bind:value={schIncAmount} />
	</div>
	<input class="btn-large" id="submit" type="submit" value="Räkna" />
</form>

<style>
input[type="submit"] {
	width: 100%;
}
</style>
