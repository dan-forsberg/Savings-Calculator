<script lang="ts">
import Form from "./components/Form.svelte";
import Chart from "./components/Chart.svelte";
import Table from "./components/Table.svelte";
</script>

<div id="description">
	<h1>Sparkalylator</h1>
	<p>
		Den här räknaren räknar ut på ett ungefär vad man kan spara ihop med avkastning på ett antal
		år. Det går även att öka sitt månadssparande med ett visst belopp efter ett specifikt antal
		år.
	</p>
</div>

<div id="container">
	<div id="form">
		<Form />
	</div>
	<div id="chart">
		<Chart />
	</div>
	<div id="table">
		<Table />
	</div>
</div>

<style>
#description {
	margin-left: 1em;
	margin-right: 1em;
}
h1 {
	margin-top: 0.2em;
}

#container {
	width: 100%;
	max-width: 100%;

	display: flex;

	margin-top: 2em;
}

#chart {
	flex-grow: 1;
}

#form,
#table {
	margin-left: 1em;
	margin-right: 1em;
}

@media screen and (max-width: 1400px) {
	#description {
		margin-left: 2em;
		margin-right: 2em;
	}

	#container {
		flex-wrap: wrap;
	}

	#chart {
		order: 3;
	}

	#form,
	#table {
		margin: 2em;
		flex-grow: 2;
	}
}
</style>
