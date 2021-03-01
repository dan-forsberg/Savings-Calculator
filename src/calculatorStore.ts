import { writable } from 'svelte/store';
import Calculator from "./scripts/calculator";

let startCapital = 10000,
	monthlySavings = 250,
	savingsPeriod = 40,
	yearlyProfit = 1.07,
	schIncAmount = 100,
	schIncPeriod = 5;


const calculator = writable(new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyProfit, schIncPeriod, schIncAmount));

export default calculator;