class Calculator {
    private readonly startCapital: number;
    private monthlySavings: number;
    private readonly scheduledIncrease: number;
    private readonly scheduledIncreasePeriod: number;
    private readonly savingsPeriod: number;
    private readonly yearlyYield: number;

    private cachedResults: Savings[] | undefined;

    constructor(startCapital: number, savingsPeriod: number, monthlySavings: number, yearlyYield: number,
        scheduledIncreasePeriod: number = 0, scheduledIncrease: number = 0) {
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyYield = yearlyYield;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
    }

    public calculateSavings(): Savings[] {
        if (this.cachedResults != undefined) {
            return this.cachedResults;
        }

        let results: Savings[] = [];
        // create a dummy Savings-object just to kickstart the calculations
        let lastYearsResult: Savings = {
            year: 0, yearlyYield: 0, resultDiff: 0,
            resultNoYield: this.startCapital, resultWithYield: this.startCapital
        };

        for (let year: number = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
            }

            let thisYearsResult: Savings = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);

            lastYearsResult = thisYearsResult;
        }

        this.cachedResults = results;
        return results;
    }

    private calculateYearly(lastYearsResult: Savings): Savings {
        const thisYearsSavings: number = this.monthlySavings * 12;
        let moneySavedWithYield: number, moneySavedNoYield: number;

        moneySavedNoYield = lastYearsResult.resultNoYield + thisYearsSavings;
        moneySavedWithYield = lastYearsResult.resultWithYield * this.yearlyYield + thisYearsSavings;

        return {
            year: lastYearsResult.year + 1,
            yearlyYield: this.yearlyYield,
            resultWithYield: Math.round(moneySavedWithYield),
            resultNoYield: Math.round(moneySavedNoYield),
            resultDiff: Math.round(moneySavedWithYield - moneySavedNoYield)
        };

    }
}