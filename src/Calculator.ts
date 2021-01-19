class Calculator {
    private readonly startCapital: number;
    private monthlySavings: number;
    private readonly scheduledIncrease: number;
    private readonly scheduledIncreasePeriod: number;
    private readonly savingsPeriod: number;
    private readonly yearlyProfit: number;

    private cachedResults: ISavings[] | undefined;

    constructor(startCapital: number, savingsPeriod: number, monthlySavings: number, yearlyProfit: number,
        scheduledIncreasePeriod: number = 0, scheduledIncrease: number = 0) {
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyProfit = yearlyProfit;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
    }

    public calculateSavings(): ISavings[] {
        if (this.cachedResults != undefined) {
            return this.cachedResults;
        }

        let results: ISavings[] = [];
        // create a dummy Savings-object just to kickstart the calculations
        let lastYearsResult: ISavings = {
            year: 0, yearlyProfit: 0, resultDiff: 0,
            resultNoProfit: this.startCapital, resultWithProfit: this.startCapital
        };

        for (let year: number = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
            }

            let thisYearsResult: ISavings = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);

            lastYearsResult = thisYearsResult;
        }

        this.cachedResults = results;
        return results;
    }

    private calculateYearly(lastYearsResult: ISavings): ISavings {
        const thisYearsSavings: number = this.monthlySavings * 12;
        let moneySavedWithProfit: number, moneySavedNoProfit: number;

        moneySavedNoProfit = lastYearsResult.resultNoProfit + thisYearsSavings;
        moneySavedWithProfit = lastYearsResult.resultWithProfit * this.yearlyProfit + thisYearsSavings;

        return {
            year: lastYearsResult.year + 1,
            yearlyProfit: this.yearlyProfit,
            resultWithProfit: Math.round(moneySavedWithProfit),
            resultNoProfit: Math.round(moneySavedNoProfit),
            resultDiff: Math.round(moneySavedWithProfit - moneySavedNoProfit)
        };

    }
}