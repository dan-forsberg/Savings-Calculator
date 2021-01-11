using System;
using System.Collections.Generic;

namespace Pension
{
    class Program
    {
        static void Main(string[] args)
        {
            Savings savings = new Savings();
            savings.startCapital = 10000;
            savings.savingsPeriod = 40;
            savings.yearlyYield = 1.08;

            savings.monthlySavings = 250;
            savings.scheduledIncrease = 100;
            savings.scheduledIncreasePeriod = 3;

            savings.CalculateSavings();

            List<int> resultWithYield = savings.GetYearlyResults();
            List<int> tax = savings.GetYearlyTaxes();
            List<int> resultNoYield = savings.GetYearlyResultNoYield();

            Console.WriteLine("{0,5} {1,10} {2,15} {3,20}", "Year", "Savings w/ yield", "Tax", "Savings w/o yield");
            for (int i = 0; i <= resultWithYield.Count; i += 5)
            {
                // when i = 5, it's actually year 6 which we don't want
                int year = (i == 0 ? i : i - 1);

                // carefully bruteforced formatting so the columns perfectly line up
                Console.WriteLine($"{year + 1,5} {resultWithYield[year] + " kr",16} {tax[year] + " kr",15} {resultNoYield[year] + " kr",20}");
            }
        }
    }
}
