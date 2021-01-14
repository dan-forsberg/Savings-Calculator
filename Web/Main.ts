import { Calculator } from './Calculator.js';

const canvas = <HTMLCanvasElement>document.getElementById('chart');
if (canvas === null) {
    throw new Error("Canvas not found!");
}
let calc: Calculator = new Calculator(
    10000,
    40,
    250,
    1.08,
    3,
    100,
    1.25
);

const ctx = canvas.getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {},
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});