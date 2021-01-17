"use strict";
class Calculator {
    constructor(startCapital, savingsPeriod, monthlySavings, yearlyYield, scheduledIncreasePeriod = 0, scheduledIncrease = 0, govtIntRate = 1.25) {
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyYield = yearlyYield;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
        this.govtIntRate = govtIntRate;
        this.fourthOfYield = 1 + ((yearlyYield - 1) / 4);
    }
    calculateSavings() {
        let results = [];
        // create a dummy Savings-object just to kickstart the calculations
        let lastYearsResult = {
            year: 0, govtIntRate: 0, yearlyYield: 0, resultTax: 0,
            resultNoYield: this.startCapital, resultWithYield: this.startCapital
        };
        for (let year = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
                console.log(`Years passed: ${year}, increasing with ${this.scheduledIncrease}, total monthly savings is ${this.monthlySavings}`);
            }
            let thisYearsResult = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);
            lastYearsResult = thisYearsResult;
        }
        return results;
    }
    calculateYearly(lastYearsResult) {
        const thisYearsSavings = this.monthlySavings * 12;
        let thisYearsTax, moneySavedWithYield, moneySavedNoYield;
        // figure out how much need to be paid in taxes
        let qResultsTotal = 0;
        let lastQuarter = lastYearsResult.resultWithYield;
        for (let i = 0; i < 4; i++) {
            lastQuarter = this.calculateQuarterlyResults(lastQuarter);
            qResultsTotal += lastQuarter;
        }
        thisYearsTax = this.calculateTax(qResultsTotal);
        moneySavedNoYield = lastYearsResult.resultNoYield + thisYearsSavings;
        moneySavedWithYield = lastYearsResult.resultWithYield * this.yearlyYield + thisYearsSavings;
        return {
            year: lastYearsResult.year + 1,
            govtIntRate: lastYearsResult.govtIntRate,
            yearlyYield: this.yearlyYield,
            resultWithYield: Math.round(moneySavedWithYield),
            resultNoYield: Math.round(moneySavedNoYield),
            resultTax: Math.round(thisYearsTax)
        };
    }
    calculateQuarterlyResults(savings) {
        return savings * this.fourthOfYield + (this.monthlySavings * 3);
    }
    calculateTax(totalYearlyResult) {
        return totalYearlyResult / 4 * (this.govtIntRate / 100) * 0.3;
    }
}
