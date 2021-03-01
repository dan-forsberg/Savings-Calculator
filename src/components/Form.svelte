<script lang="ts">
import params from "../parameters";
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

// Set the variables in the store only when submitting
// Otherwise the chart and table will be updated unnecessarily often
function update() {
	params.set({
		startCapital,
		monthlySavings,
		savingsPeriod,
		yearlyProfit,
		schIncAmount,
		schIncPeriod,
	});
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
