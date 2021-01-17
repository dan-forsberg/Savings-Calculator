"use strict";
class Calculator {
    constructor(startCapital, savingsPeriod, monthlySavings, yearlyYield, scheduledIncreasePeriod = 0, scheduledIncrease = 0) {
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyYield = yearlyYield;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
    }
    calculateSavings() {
        let results = [];
        // create a dummy Savings-object just to kickstart the calculations
        let lastYearsResult = {
            year: 0, govtIntRate: 0, yearlyYield: 0, resultDiff: 0,
            resultNoYield: this.startCapital, resultWithYield: this.startCapital
        };
        for (let year = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
            }
            let thisYearsResult = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);
            lastYearsResult = thisYearsResult;
        }
        return results;
    }
    calculateYearly(lastYearsResult) {
        const thisYearsSavings = this.monthlySavings * 12;
        let moneySavedWithYield, moneySavedNoYield;
        moneySavedNoYield = lastYearsResult.resultNoYield + thisYearsSavings;
        moneySavedWithYield = lastYearsResult.resultWithYield * this.yearlyYield + thisYearsSavings;
        return {
            year: lastYearsResult.year + 1,
            govtIntRate: lastYearsResult.govtIntRate,
            yearlyYield: this.yearlyYield,
            resultWithYield: Math.round(moneySavedWithYield),
            resultNoYield: Math.round(moneySavedNoYield),
            resultDiff: Math.round(moneySavedWithYield - moneySavedNoYield)
        };
    }
}
