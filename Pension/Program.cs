using System;
using System.Collections.Generic;

namespace Savings
{
    class Program
    {
        static void Main()
        {
            int startCapital = 10000;
            int savingsPeriod = 40;
            double yearlyYield = 1.08;
            int monthlySavings = 250;
            int scheduledIncrease = 100;
            int scheduledIncreasePeriod = 3;

            Calculator calc = new Calculator(savingsPeriod, startCapital, monthlySavings, scheduledIncrease, scheduledIncreasePeriod, yearlyYield);

            List<Savings> results = calc.CalculateSavings();

            Console.WriteLine("{0,5} {1,20} {2,15} {3,15} {4,15}", "Year", "Results w/ yield", "Tax", "Results w/o yield", "Diff in %");
            foreach (var result in results)
            {
                double diff = (((double)result.ResultWithYield / result.ResultNoYield) - 1) * 100;

                // carefully bruteforced formatting so the columns perfectly line up
                Console.WriteLine("{0,5} {1,20} {2,15} {3,17} {4,15}",
                    result.Year + 1,
                    result.ResultWithYield.ToString("N0") + " kr", 
                    result.ResultTax.ToString("N0") + " kr",
                    result.ResultNoYield.ToString("N0") + " kr",
                    diff.ToString("N0") + "%");
            }
        }
    }
}
