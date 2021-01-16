interface Savings {
    readonly year: number;
    readonly govtIntRate: number;
    readonly yearlyYield: number;
    readonly resultWithYield: number;
    readonly resultNoYield: number;
    readonly resultTax: number;
}

class Calculator {
    private readonly startCapital: number;
    private monthlySavings: number;
    private readonly scheduledIncrease: number;
    private readonly scheduledIncreasePeriod: number;
    private readonly savingsPeriod: number;
    private readonly yearlyYield: number;
    private readonly govtIntRate: number;
    private readonly fourthOfYield: number;

    constructor(startCapital: number, savingsPeriod: number, monthlySavings: number, yearlyYield: number,
        scheduledIncreasePeriod: number = 0, scheduledIncrease: number = 0, govtIntRate: number = 1.25) {
        this.startCapital = startCapital;
        this.savingsPeriod = savingsPeriod;
        this.monthlySavings = monthlySavings;
        this.yearlyYield = yearlyYield;
        this.scheduledIncreasePeriod = scheduledIncreasePeriod;
        this.scheduledIncrease = scheduledIncrease;
        this.govtIntRate = govtIntRate;

        this.fourthOfYield = 1 + ((yearlyYield - 1) / 4);
    }

    public calculateSavings(): ReadonlyArray<Savings> {
        let results: Array<Savings> = [];
        // create a dummy Savings-object just to kickstart the calculations
        let lastYearsResult: Savings = {
            year: 0, govtIntRate: 0, yearlyYield: 0, resultTax: 0,
            resultNoYield: this.startCapital, resultWithYield: this.startCapital
        };

        for (let year: number = 0; year < this.savingsPeriod; year++) {
            if (year % this.scheduledIncreasePeriod === 0) {
                this.monthlySavings += this.scheduledIncrease;
            }

            let thisYearsResult: Savings = this.calculateYearly(lastYearsResult);
            results.push(thisYearsResult);

            lastYearsResult = thisYearsResult;
        }

        return results;
    }

    private calculateYearly(lastYearsResult: Savings): Savings {
        const thisYearsSavings: number = this.monthlySavings * 12;
        let thisYearsTax: number, moneySavedWithYield: number, moneySavedNoYield: number;

        // figure out how much need to be paid in taxes
        let qResultsTotal: number = 0;
        let lastQuarter: number = lastYearsResult.resultWithYield;
        for (let i: number = 0; i < 4; i++) {
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
            resultWithYield: moneySavedWithYield,
            resultNoYield: moneySavedNoYield,
            resultTax: thisYearsTax
        };

    }

    private calculateQuarterlyResults(savings: number): number {
        return savings * this.fourthOfYield + (this.monthlySavings * 3);
    }

    private calculateTax(totalYearlyResult: number): number {
        return totalYearlyResult / 4 * (this.govtIntRate / 100) * 0.3;
    }
}