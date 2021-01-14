import { Calculator } from 'Calculator.js';
let calc = new Calculator(10000, 40, 250, 1.08, 3, 100, 1.25);
let results = calc.calculateSavings();
results.forEach(saving => {
    console.log(`Year: ${saving.year}: ${saving.resultWithYield}`);
});
