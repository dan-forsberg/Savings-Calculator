"use strict";
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
function calculate(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc, govtIntRate) {
    let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc, govtIntRate);
    let results = calc.calculateSavings();
    let savedWithYield = [];
    let savedNoYield = [];
    let taxes = [];
    let chartLabels = [];
    results.forEach(result => {
        chartLabels.push(result.year.toString());
        savedWithYield.push(result.resultWithYield);
        savedNoYield.push(result.resultNoYield);
        taxes.push(result.resultTax);
        console.log(`År ${result.year}: ${result.resultWithYield}`);
    });
    createChart(chartLabels, savedWithYield, savedNoYield, taxes);
}
function createChart(chartLabels, savedWithYield, savedNoYield, taxes) {
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                    data: savedWithYield,
                    label: "Sparat med avkastning",
                    borderColor: "#3e95cd",
                    fill: false
                } /*,
                {
                    data: savedNoYield,
                    label: "Sparat utan avkastning",
                    borderColor: "#8e5ea2",
                    fill: false
                },
                {
                    data: taxes,
                    label: "Skatt",
                    borderColor: "#3cba9f",
                    fill: false
                }*/
            ]
        },
        options: {
            title: {
                display: true,
                text: "Resultat"
            },
            scale: {
                ticks: {
                    stepSize: 100
                }
            }
        },
    });
}
