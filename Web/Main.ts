import { Calculator } from './Calculator.js';
const canvas = <HTMLCanvasElement>document.getElementById('chart');
const ctx = canvas.getContext('2d');


let startCapital = document.getElementById('startCapital').value;
let monthlySavings = document.getElementById('monthlySavings').value;
let savingsPeriod = document.getElementById('savingsPeriod').value;
let yearlyYield = document.getElementById('yield').value / 100 + 1;
let schIncPeriod = document.getElementById('scheduledIncreasePeriod').value;
let schInc = document.getElementById('scheduledIncrease').value;
let govtIntRate = document.getElementById('govtIntRate').value;

let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc, govtIntRate);
let results = calc.calculateSavings();

let savedWithYield: Array<number> = [];
let savedNoYield: Array<number> = [];
let taxes: Array<number> = [];
let chartLabels: Array<string> = [];

results.forEach(result => {
    chartLabels.push(result.year.toString());
    savedWithYield.push(result.resultWithYield);
    savedNoYield.push(result.resultNoYield);
    taxes.push(result.resultTax);

    console.log(`År ${result.year}: ${result.resultWithYield}`);
});

let myChart = new Chart(ctx, {
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
            data: taxes,
            label: "Skatt",
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
            yAxes: {
                ticks: {
                    stepSize: 1000,
                }
            }
        }
    }
});