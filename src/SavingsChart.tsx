interface ISavingsChartProps {
    calculator: Calculator;
}

class SavingsChart extends React.Component<ISavingsChartProps> {
    private canvas: JSX.Element;
    private chart: Chart | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    constructor(props: ISavingsChartProps) {
        super(props);
        this.canvas = <canvas id="chart" ref={(c) => c != null ? this.ctx = c.getContext("2d") : console.error("c is null")}></canvas>;
    }

    public render() {
        let savedWithProfit: number[] = [],
            savedNoProfit: number[] = [],
            difference: number[] = [],
            chartLabels: string[] = [];

        let savings = this.props.calculator.calculateSavings();
        savings.forEach(result => {
            chartLabels.push(result.year.toString());
            savedWithProfit.push(result.resultWithProfit);
            difference.push(result.resultDiff);
            savedNoProfit.push(result.resultNoProfit);
        });
        this.createOrUpdateChart(chartLabels, savedWithProfit, savedNoProfit, difference);
        return <div id="chartContainer">{this.canvas}</div>;
    }

    public createOrUpdateChart(chartLabels: string[], savedWithProfit: number[], savedNoProfit: number[], difference: number[]) {
        const datasets = this.createDatasets(savedWithProfit, savedNoProfit, difference);
        if (this.chart === null) {
            this.chart = this.createChart(chartLabels, datasets);
        } else {
            this.updateChart(chartLabels, datasets);
        }
    }

    private updateChart(chartLabels: string[], datasets: Chart.ChartDataSets[]): void {
        if (this.chart == undefined) {
            console.error("Chart is undefined. Use createOrUpdateChart() instead.");
        } else {
            this.chart.data.labels = chartLabels;
            this.chart.data.datasets = datasets;
            this.chart.update();
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

    private createChart(chartLabels: string[], datasets: Chart.ChartDataSets[]): Chart | null {
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

        if (this.ctx == null)
            return null;
        
        return new Chart(this.ctx, {
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