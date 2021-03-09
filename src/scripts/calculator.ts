import type ISavings from "./ISavings";

export default class Calculator {
	private readonly startCapital: number;
	private monthlySavings: number;
	private readonly scheduledIncrease: number;
	private readonly scheduledIncreasePeriod: number;
	private readonly goalNumber: number;
	private readonly yearlyProfit: number;
	private readonly calculatePeriod: boolean;


	private cachedResults: ISavings[] | undefined;

	constructor(
		startCapital: number,
		goalNumber: number,
		calculatePeriod: boolean,
		monthlySavings: number,
		yearlyProfit: number,
		scheduledIncreasePeriod: number = 0,
		scheduledIncrease: number = 0) {
		this.startCapital = startCapital;
		this.goalNumber = goalNumber;
		this.calculatePeriod = calculatePeriod;
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


		// while true
		let year = 0;
		while (true) {
			if (year % this.scheduledIncreasePeriod === 0) {
				this.monthlySavings = this.monthlySavings + this.scheduledIncrease;
			}

			let thisYearsResult: ISavings = this.calculateYearly(lastYearsResult);
			results.push(thisYearsResult);

			lastYearsResult = thisYearsResult;

			if ((this.calculatePeriod && year == this.goalNumber) ||
				(!this.calculatePeriod && thisYearsResult.resultWithProfit >= this.goalNumber)) {
				break;
			}
			year++;
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