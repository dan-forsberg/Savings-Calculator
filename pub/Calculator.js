"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, scheduledIncreasePeriod, scheduledIncrease) {
        if (scheduledIncreasePeriod === void 0) { scheduledIncreasePeriod = 0; }
        if (scheduledIncrease === void 0) { scheduledIncrease = 0; }
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyYield = yearlyYield;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
    }
    // todo: cache results
    Calculator.prototype.calculateSavings = function () {
        var results = [];
        // create a dummy Savings-object just to kickstart the calculations
        var lastYearsResult = {
            year: 0, yearlyYield: 0, resultDiff: 0,
            resultNoYield: this.startCapital, resultWithYield: this.startCapital
        };
        for (var year = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
            }
            var thisYearsResult = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);
            lastYearsResult = thisYearsResult;
        }
        return results;
    };
    Calculator.prototype.calculateYearly = function (lastYearsResult) {
        var thisYearsSavings = this.monthlySavings * 12;
        var moneySavedWithYield, moneySavedNoYield;
        moneySavedNoYield = lastYearsResult.resultNoYield + thisYearsSavings;
        moneySavedWithYield = lastYearsResult.resultWithYield * this.yearlyYield + thisYearsSavings;
        return {
            year: lastYearsResult.year + 1,
            yearlyYield: this.yearlyYield,
            resultWithYield: Math.round(moneySavedWithYield),
            resultNoYield: Math.round(moneySavedNoYield),
            resultDiff: Math.round(moneySavedWithYield - moneySavedNoYield)
        };
    };
    return Calculator;
}());
