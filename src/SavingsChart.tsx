interface ISavingsChartProps {
    calculator: Calculator;
}

interface ISavingsChartState {
    savings: Savings[];
    canvas: JSX.Element;
    chart?: Chart;
}

class SavingsChart extends React.Component<ISavingsChartProps, ISavingsChartState> {
    private chart: Chart | null = null;

    constructor(props: ISavingsChartProps) {
    super(props);
    this.state = {
        savings: this.props.calculator.calculateSavings(),
        canvas: <canvas id="chart"></canvas>
    };
    }

    public render() {
        let savedWithProfit: number[] = [],
            savedNoProfit: number[] = [],
            difference: number[] = [],
            chartLabels: string[] = [];

        this.state.savings.forEach(result => {
            chartLabels.push(result.year.toString());
            savedWithProfit.push(result.resultWithProfit);
            difference.push(result.resultDiff);
            savedNoProfit.push(result.resultNoProfit);
        });
        this.createOrUpdateChart(chartLabels, savedWithProfit, savedNoProfit, difference);
        return this.state.canvas;
    }

    public createOrUpdateChart(chartLabels: string[], savedWithProfit: number[], savedNoProfit: number[], difference: number[]) {
        const datasets = this.createDatasets(savedWithProfit, savedNoProfit, difference);
        if (this.state.chart === null) {
            this.setState({ chart: this.createChart(chartLabels, datasets) });
        } else {
            this.updateChart(chartLabels, datasets);
        }
    }

    private updateChart(chartLabels: string[], datasets: Chart.ChartDataSets[]): void {
        if (this.state.chart == undefined) {
            console.error("Chart is undefined. Use createOrUpdateChart() instead.");
        } else {
            this.state.chart.data.labels = chartLabels;
            this.state.chart.data.datasets = datasets;
            this.state.chart.update();
        }
    }

    private createDatasets(savedWithProfit: number[], savedNoProfit: number[], difference: number[]): Chart.ChartDataSets[] {
        return [{
            data: savedWithProfit,
            label: "Sparat med avkastning",
            borderColor: "#3e95cd",
            fill: false
        },
        {
            data: savedNoProfit,
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

    private createChart(chartLabels: string[], datasets: Chart.ChartDataSets[]): Chart {
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

        //todo: fix this
        let ctx = this.state.canvas.getContext("2d");
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
}