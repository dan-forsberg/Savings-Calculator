<script lang="ts">
import Calculator from "../scripts/calculator";
import calculator from "../calculatorStore";

import { onMount } from "svelte";

let startCapital = 10000,
	monthlySavings = 250,
	savingsPeriod = 40,
	yearlyProfit = 7,
	schIncAmount = 100,
	schIncPeriod = 5,
	goalAmount = 1000000;

let period = true;

onMount(() => {
	update();
});

function update() {
	// change 7 -> 1.07
	let profit = 1 + yearlyProfit / 100;
	calculator.set(
		new Calculator(
			zeroIfNull(startCapital),
			period ? zeroIfNull(savingsPeriod) : zeroIfNull(goalAmount),
			period,
			zeroIfNull(monthlySavings),
			zeroIfNull(profit),
			zeroIfNull(schIncPeriod),
			zeroIfNull(schIncAmount)
		)
	);
}

/* 1000 -> 1 000 */
function readableNums(value: number): string {
	if (value !== null) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	else return "0";
}

function zeroIfNull(value: number | string | null): number {
	if (value == null) return 0;
	else if (typeof value === "number") return value;
	else return Number.parseInt(value);
}
</script>

<form
	on:submit|preventDefault={() => {
		update();
	}}>
	<div class="input-field">
		<label class="active" for="startCapital"
			>Startkapital: {readableNums(startCapital)} kr</label>
		<input id="startCapital" type="number" min="0" bind:value={startCapital} />
	</div>

	<div class="input-field">
		<label class="active" for="monthlySavings"
			>Månadsparande: {readableNums(monthlySavings)} kr</label>
		<input id="monthlySavings" type="number" min="0" bind:value={monthlySavings} />
	</div>

	<div class="switch">
		<label>
			Målvärde
			<input bind:checked={period} type="checkbox" />
			<span class="lever" />
			Antal år
		</label>
	</div>

	<div class="input-field">
		{#if period}
			<label class="active" for="period">Antal år: {zeroIfNull(savingsPeriod)}</label>
			<input
				id="period"
				type="number"
				min="1"
				max="100"
				step="1"
				bind:value={savingsPeriod} />
		{:else}
			<label class="active" for="goalAmount">Målvärde: {readableNums(goalAmount)} kr</label>
			<input id="goalAmount" type="number" bind:value={goalAmount} />
		{/if}
	</div>
	<div class="input-field">
		<label class="active" for="profit">Avkastning per år: {zeroIfNull(yearlyProfit)}%</label>
		<input id="profit" type="number" min="0" max="500" bind:value={yearlyProfit} />
	</div>
	<div class="input-field">
		<label class="active" for="schIncPer">Vart {zeroIfNull(schIncPeriod)} år ökar...</label>
		<input id="schIncPer" type="number" min="0" max="100" bind:value={schIncPeriod} />
	</div>
	<div class="input-field">
		<label class="active" for="schInc">...sparandet med {readableNums(schIncAmount)} kr</label>
		<input id="schInc" type="number" min="0" bind:value={schIncAmount} />
	</div>
	<input class="btn-large" id="submit" type="submit" value="Räkna" />
</form>

<style>
input[type="submit"] {
	width: 100%;
}
</style>
