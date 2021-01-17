"use strict";
/*
TODO: update chart if it already exists
*/
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let chart = null;
function calculate(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc) {
    let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc);
    let results = calc.calculateSavings();
    let savedWithYield = [], savedNoYield = [], difference = [], chartLabels = [];
    results.forEach(result => {
        chartLabels.push(result.year.toString());
        savedWithYield.push(result.resultWithYield);
        difference.push(result.resultDiff);
        savedNoYield.push(result.resultNoYield);
    });
    createChart(chartLabels, savedWithYield, savedNoYield, difference);
}
function createChart(chartLabels, savedWithYield, savedNoYield, difference) {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
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
                }]
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
                            /* Convert 1300000 => 1.3M, 20000 => 20K */
                            callback: (value, index, values) => {
                                return Math.abs(Number(value)) >= 1.0e+6
                                    ? Math.abs(Number(value)) / 1.0e+6 + "M"
                                    : Math.abs(Number(value)) >= 1.0e+3
                                        ? Math.abs(Number(value)) / 1.0e+3 + "K"
                                        : Math.abs(Number(value));
                            }
                        }
                    }]
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        if (tooltipItem.value !== undefined) {
                            /* convert 100000 => 1 000 000 */
                            return tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
                        }
                        return "";
                    }
                }
            }
        },
    });
}
