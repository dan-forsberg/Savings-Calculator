import Chart from 'chart.js';
import { Calculator } from './Calculator.js';
import React from 'react';
// https://reactjs.org/docs/forms.html

const canvas = <HTMLCanvasElement>document.getElementById('chart');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

function calculate(startCapital: number, savingsPeriod: number, monthlySavings: number, yearlyYield: number, schIncPeriod: number, schInc: number, govtIntRate: number) {
    let calc = new Calculator(startCapital, savingsPeriod, monthlySavings, yearlyYield, schIncPeriod, schInc, govtIntRate);
    let results = calc.calculateSavings();

    let savedWithYield: Array<number> = [];
    let savedNoYield: Array<number> = [];
    let taxes: Array<number> = [];
    let chartLabels: Array<string> = [];

    results.forEach(result => {
        chartLabels.push(result.year.toString());
        savedWithYield.push(result.resultWithYield);
        savedNoYield.push(result.resultNoYield);
        taxes.push(result.resultTax);

        console.log(`År ${result.year}: ${result.resultWithYield}`);
    });

    createChart(chartLabels, savedWithYield, savedNoYield, taxes);
}

function createChart(chartLabels: Array<string>, savedWithYield: Array<number>, savedNoYield: Array<number>, taxes: Array<number>) {
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                data: savedWithYield,
                label: "Sparat med avkastning",
                borderColor: "#3e95cd",
                fill: false
            },
            {
                data: savedNoYield,
                label: "Sparat utan avkastning",
                borderColor: "#8e5ea2",
                fill: false
            },
            {
                data: taxes,
                label: "Skatt",
                borderColor: "#3cba9f",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: "Resultat"
            },
            scale: {
                ticks: {
                    stepSize: 100
                }
            }
        },
    });

}