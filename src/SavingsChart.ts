interface IProps {
    savings: Savings[];
}

interface IState {
    savings: Savings[];
}

class SavingsChart extends React.Component<IProps, IState> {
    private readonly canvas = <HTMLCanvasElement>document.getElementById('chart');
    private readonly ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    private chart: Chart | null = null;

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let savedWithYield: number[] = [],
            savedNoYield: number[] = [],
            difference: number[] = [],
            chartLabels: string[] = [];

        this.props.savings.forEach(result => {
            chartLabels.push(result.year.toString());
            savedWithYield.push(result.resultWithYield);
            difference.push(result.resultDiff);
            savedNoYield.push(result.resultNoYield);
        });

        this.createOrUpdateChart(chartLabels, savedWithYield, savedNoYield, difference);
        return this.chart;
    }

    public createOrUpdateChart(chartLabels: string[], savedWithYield: number[], savedNoYield: number[], difference: number[]) {
        const datasets = this.createDatasets(savedWithYield, savedNoYield, difference);
        if (this.chart === null) {
            this.chart = this.createChart(chartLabels, datasets);
            
        } else {
            this.updateChart(chartLabels, datasets);
        }
    }

    private updateChart(chartLabels: string[], datasets: Chart.ChartDataSets[]):void {
        if (this.chart == undefined) {
            console.error("Chart is undefined. Use createOrUpdateChart() instead.");
        } else {
            this.chart.data.labels = chartLabels;
            this.chart.data.datasets = datasets;
            this.chart.update();
        }
    }

    private createDatasets(savedWithYield: number[], savedNoYield: number[], difference: number[]): Chart.ChartDataSets[] {
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

    private createChart(chartLabels: string[], datasets: Chart.ChartDataSets[]):Chart {
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