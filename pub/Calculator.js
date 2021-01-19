"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(startCapital, savingsPeriod, monthlySavings, yearlyProfit, scheduledIncreasePeriod, scheduledIncrease) {
        if (scheduledIncreasePeriod === void 0) { scheduledIncreasePeriod = 0; }
        if (scheduledIncrease === void 0) { scheduledIncrease = 0; }
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyProfit = yearlyProfit;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
    }
    Calculator.prototype.calculateSavings = function () {
        if (this.cachedResults != undefined) {
            return this.cachedResults;
        }
        var results = [];
        // create a dummy Savings-object just to kickstart the calculations
        var lastYearsResult = {
            year: 0, yearlyProfit: 0, resultDiff: 0,
            resultNoProfit: this.startCapital, resultWithProfit: this.startCapital
        };
        for (var year = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
            }
            var thisYearsResult = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);
            lastYearsResult = thisYearsResult;
        }
        this.cachedResults = results;
        return results;
    };
    Calculator.prototype.calculateYearly = function (lastYearsResult) {
        var thisYearsSavings = this.monthlySavings * 12;
        var moneySavedWithProfit, moneySavedNoProfit;
        moneySavedNoProfit = lastYearsResult.resultNoProfit + thisYearsSavings;
        moneySavedWithProfit = lastYearsResult.resultWithProfit * this.yearlyProfit + thisYearsSavings;
        return {
            year: lastYearsResult.year + 1,
            yearlyProfit: this.yearlyProfit,
            resultWithProfit: Math.round(moneySavedWithProfit),
            resultNoProfit: Math.round(moneySavedNoProfit),
            resultDiff: Math.round(moneySavedWithProfit - moneySavedNoProfit)
        };
    };
    return Calculator;
}());
