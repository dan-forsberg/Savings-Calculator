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
        _this.chart = null;
        _this.state = {
            ctx: null
        };
        _this.canvas = React.createElement("canvas", { id: "chart", ref: function (c) { return c != null ? _this.setState({ ctx: c.getContext("2d") }) : console.error("c is null"); } });
        return _this;
    }
    SavingsChart.prototype.render = function () {
        var savedWithProfit = [], savedNoProfit = [], difference = [], chartLabels = [];
        var savings = this.props.calculator.calculateSavings();
        savings.forEach(function (result) {
            chartLabels.push(result.year.toString());
            savedWithProfit.push(result.resultWithProfit);
            difference.push(result.resultDiff);
            savedNoProfit.push(result.resultNoProfit);
        });
        this.createOrUpdateChart(chartLabels, savedWithProfit, savedNoProfit, difference);
        return React.createElement("div", { id: "chartContainer" }, this.canvas);
    };
    SavingsChart.prototype.createOrUpdateChart = function (chartLabels, savedWithProfit, savedNoProfit, difference) {
        var datasets = this.createDatasets(savedWithProfit, savedNoProfit, difference);
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
    SavingsChart.prototype.createDatasets = function (savedWithProfit, savedNoProfit, difference) {
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
        if (this.state.ctx == null)
            return null;
        return new Chart(this.state.ctx, {
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
