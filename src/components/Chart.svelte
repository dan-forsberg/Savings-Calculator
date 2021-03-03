<script lang="ts">
import Chart from "chart.js";
import calculatorStore from "../calculatorStore";
import { onMount } from "svelte";
import type Calculator from "../scripts/calculator";

let ctx: HTMLCanvasElement;
let chart: Chart;
let calculator: Calculator;

onMount(() => {
	ctx = document.getElementById("savingsChart") as HTMLCanvasElement;
	calculatorStore.subscribe((newCalc) => {
		calculator = newCalc;
		update();
	});
});

function update() {
	let savedWithProfit: number[] = [],
		savedNoProfit: number[] = [],
		difference: number[] = [],
		chartLabels: string[] = [];

	let savings = calculator.calculateSavings();
	savings.forEach((result) => {
		chartLabels.push(result.year.toString());
		savedWithProfit.push(result.resultWithProfit);
		difference.push(result.resultDiff);
		savedNoProfit.push(result.resultNoProfit);
	});

	createOrUpdateChart(chartLabels, savedWithProfit, savedNoProfit, difference);
}

function createOrUpdateChart(
	chartLabels: string[],
	savedWithProfit: number[],
	savedNoProfit: number[],
	difference: number[]
) {
	const datasets = createDatasets(savedWithProfit, savedNoProfit, difference);
	if (chart === undefined) {
		chart = createChart(chartLabels, datasets);
	} else {
		updateChart(chartLabels, datasets);
	}
}

function updateChart(chartLabels: string[], datasets: Chart.ChartDataSets[]) {
	if (chart == undefined) {
		console.error("Chart is undefined. Use createOrUpdateChart() instead.");
	} else {
		chart.data.labels = chartLabels;
		chart.data.datasets = datasets;
		chart.update();
	}
}

function createDatasets(
	savedWithProfit: number[],
	savedNoProfit: number[],
	difference: number[]
): Chart.ChartDataSets[] {
	return [
		{
			data: savedWithProfit,
			label: "Sparat med avkastning",
			borderColor: "#3e95cd",
			fill: false,
		},
		{
			data: savedNoProfit,
			label: "Sparat utan avkastning",
			borderColor: "#8e5ea2",
			fill: false,
		},
		{
			data: difference,
			label: "Skillnad",
			borderColor: "#3cba9f",
			fill: false,
		},
	];
}

function createChart(chartLabels: string[], datasets: Chart.ChartDataSets[]): Chart | null {
	/* Convert 1300000 => 1.3M, 20000 => 20K */
	const yAxisFormatter = (value: number | string, _, __): string | number => {
		return Math.abs(Number(value)) >= 1.0e6
			? Math.abs(Number(value)) / 1.0e6 + "M"
			: Math.abs(Number(value)) >= 1.0e3
			? Math.abs(Number(value)) / 1.0e3 + "K"
			: Math.abs(Number(value));
	};

	/* Convert 100000 => 1 000 000 */
	const labelFormatter = (tooltipItem: Chart.ChartTooltipItem, _) => {
		if (tooltipItem.value !== undefined) {
			return tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
		}
		return "";
	};

	return new Chart(ctx, {
		type: "line",
		data: {
			labels: chartLabels,
			datasets: datasets,
		},
		options: {
			title: {
				display: true,
				text: "Resultat",
			},
			scales: {
				yAxes: [
					{
						type: "linear",
						ticks: {
							callback: yAxisFormatter,
						},
					},
				],
			},
			tooltips: {
				callbacks: {
					label: labelFormatter,
				},
			},
		},
	});
}
</script>

<div>
	<canvas id="savingsChart" />
</div>

<style>
canvas {
	width: 100%;
}
</style>
