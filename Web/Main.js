import { Calculator } from './Calculator.js';
const canvas = document.getElementById('chart');
if (canvas === null) {
    throw new Error("Canvas not found!");
}

let startCapital = document.getElementById('startCapital').value;
let monthlySavings = document.getElementById('monthlySavings').value;
let savingsPeriod = document.getElementById('savingsPeriod').value;
let yield = document.getElementById('yield').value;
let schIncPeriod = document.getElementById('scheduledIncreasePeriod').value;
let schInc = document.getElementById('scheduledIncrease').value;
let govtIntRate = document.getElementById('govtIntRate').value;

let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yield, schIncPeriod, schInc, govtIntRate);
const ctx = canvas.getContext('2d');

