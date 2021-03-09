import { writable } from 'svelte/store';
import Calculator from "./scripts/calculator";

const calculator = writable(new Calculator(0, 0, true, 0, 0, 0));

export default calculator;