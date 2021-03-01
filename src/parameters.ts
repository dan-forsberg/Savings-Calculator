import { writable } from 'svelte/store';

const params = writable({
	startCapital: 0,
	monthlySavings: 0,
	savingsPeriod: 0,
	yearlyProfit: 0,
	schIncPeriod: 0,
	schIncAmount: 0
});

export default params;