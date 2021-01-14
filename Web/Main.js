import { Calculator } from './Calculator.js';
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let startCapital = document.getElementById('startCapital').value;
let monthlySavings = document.getElementById('monthlySavings').value;
let savingsPeriod = document.getElementById('savingsPeriod').value;
let yearlyYield = document.getElementById('yield').value;
let schIncPeriod = document.getElementById('scheduledIncreasePeriod').value;
let schInc = document.getElementById('scheduledIncrease').value;
let govtIntRate = document.getElementById('govtIntRate').value;
let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc, govtIntRate);
let results = calc.calculateSavings();
let savedWithYield = [];
let savedNoYield = [];
let taxes = [];
let labels;
results.forEach(result => {
    labels.push(result.year.toString());
    savedWithYield.push(result.resultWithYield);
    savedNoYield.push(result.resultNoYield);
    taxes.push(result.resultTax);
});
let myChart = new Chart(ctx, {
    type: 'line',
    data: savedWithYield
});
