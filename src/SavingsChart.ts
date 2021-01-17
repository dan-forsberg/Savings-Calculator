const canvas = <HTMLCanvasElement>document.getElementById('chart');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
let chart: Chart | null = null;

function createOrUpdateChart(chartLabels: string[], savedWithYield: number[], savedNoYield: number[], difference: number[]) {
    const datasets = createDatasets(savedWithYield, savedNoYield, difference);
    if (chart === null) {
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

function createDatasets(savedWithYield: number[], savedNoYield: number[], difference: number[]): Chart.ChartDataSets[] {
    return [{
        data: savedWithYield,
        label: "Sparat med avkastning",
        borderColor: "#3e95cd",
        fill: false
    },
    {
        data: savedNoYield,
        label: "Sparat utan avkastning",
        borderColor: "#8e5ea2",
        fill: false
    },
    {
        data: difference,
        label: "Skillnad",
        borderColor: "#3cba9f",
        fill: false
    }];
}

function createChart(chartLabels: string[], datasets: Chart.ChartDataSets[]) {
    /* Convert 1300000 => 1.3M, 20000 => 20K */
    const yAxisFormatter = (value: number | string, index: number, values: number[] | string[]): string | number => {
        return Math.abs(Number(value)) >= 1.0e+6
            ? Math.abs(Number(value)) / 1.0e+6 + "M"
            : Math.abs(Number(value)) >= 1.0e+3
                ? Math.abs(Number(value)) / 1.0e+3 + "K"
                : Math.abs(Number(value))
    };
    /* Convert 100000 => 1 000 000 */
    const labelFormatter = (tooltipItem: Chart.ChartTooltipItem, data: Chart.ChartData) => {
        if (tooltipItem.value !== undefined) {
            return tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
        }
        return "";
    }


    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: datasets
        },
        options: {
            title: {
                display: true,
                text: "Resultat"
            },
            scales: {
                yAxes: [{
                    type: "linear",
                    ticks: {
                        callback: yAxisFormatter
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: labelFormatter
                }
            }
        },
    });
}