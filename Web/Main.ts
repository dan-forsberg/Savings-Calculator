import { Calculator, Savings } from './Calculator';

let calc: Calculator = new Calculator(
    10000,
    40,
    250,
    1.08,
    3,
    100,
    1.25
);

let results: ReadonlyArray<Savings> = calc.calculateSavings();
results.forEach(saving => {
    console.log(`Year: ${saving.year}: ${saving.resultWithYield}`);
});