<script lang="ts">
import Form from "./components/Form.svelte";
import Chart from "./components/Chart.svelte";
import Table from "./components/Table.svelte";
</script>

<div id="container">
	<Form />
	<Chart />
	<div>
		<Table />
	</div>
</div>

<style>
#container {
	width: 100%;
	max-width: 100%;

	display: flex;
	justify-content: space-between;
}
</style>
