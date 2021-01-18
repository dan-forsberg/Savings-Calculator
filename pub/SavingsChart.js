"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SavingsChart = /** @class */ (function (_super) {
    __extends(SavingsChart, _super);
    function SavingsChart(props) {
        var _this = _super.call(this, props) || this;
        _this.canvas = document.getElementById('chart');
        _this.ctx = _this.canvas.getContext('2d');
        _this.chart = null;
        return _this;
    }
    SavingsChart.prototype.render = function () {
        var savedWithYield = [], savedNoYield = [], difference = [], chartLabels = [];
        this.props.savings.forEach(function (result) {
            chartLabels.push(result.year.toString());
            savedWithYield.push(result.resultWithYield);
            difference.push(result.resultDiff);
            savedNoYield.push(result.resultNoYield);
        });
        return this.createOrUpdateChart(chartLabels, savedWithYield, savedNoYield, difference);
    };
    SavingsChart.prototype.createOrUpdateChart = function (chartLabels, savedWithYield, savedNoYield, difference) {
        var datasets = this.createDatasets(savedWithYield, savedNoYield, difference);
        if (this.chart === null) {
            this.chart = this.createChart(chartLabels, datasets);
        }
        else {
            this.updateChart(chartLabels, datasets);
        }
    };
    SavingsChart.prototype.updateChart = function (chartLabels, datasets) {
        if (this.chart == undefined) {
            console.error("Chart is undefined. Use createOrUpdateChart() instead.");
        }
        else {
            this.chart.data.labels = chartLabels;
            this.chart.data.datasets = datasets;
            this.chart.update();
        }
    };
    SavingsChart.prototype.createDatasets = function (savedWithYield, savedNoYield, difference) {
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
    };
    SavingsChart.prototype.createChart = function (chartLabels, datasets) {
        /* Convert 1300000 => 1.3M, 20000 => 20K */
        var yAxisFormatter = function (value, index, values) {
            return Math.abs(Number(value)) >= 1.0e+6
                ? Math.abs(Number(value)) / 1.0e+6 + "M"
                : Math.abs(Number(value)) >= 1.0e+3
                    ? Math.abs(Number(value)) / 1.0e+3 + "K"
                    : Math.abs(Number(value));
        };
        /* Convert 100000 => 1 000 000 */
        var labelFormatter = function (tooltipItem, data) {
            if (tooltipItem.value !== undefined) {
                return tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
            }
            return "";
        };
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
            }
        });
    };
    return SavingsChart;
}(React.Component));
