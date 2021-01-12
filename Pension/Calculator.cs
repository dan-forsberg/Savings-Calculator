using System.Collections.Generic;

namespace Savings
{
    class Calculator
    {
        private readonly int startCapital;
        private int monthlySavings;
        private readonly int scheduledIncrease;
        private readonly int scheduledIncreasePeriod;
        private readonly int savingsPeriod;
        private readonly double yearlyYield;
        private readonly double govtIntRate;

        /// <summary>
        /// Sets up the variables used for this savings calculator
        /// </summary>
        /// <param name="savingsPeriod">How many years are you saving for</param>
        /// <param name="startCapital">How much money do you start with</param>
        /// <param name="monthlySavings">How much do you plan to save every month</param>
        /// <param name="yearlyYield">How much do the funds/shares grow per year</param>
        /// <param name="govtIntRate">The estimated statslåneränta, default is 1.25% because of its lower limit</param>
        /// <param name="scheduledIncreasePeriod">For every x years the monthlySavings should increase</param>
        /// <param name="scheduledIncrease">For every scheduledIncreasePeriod the monthlySavings should increase by</param>
        public Calculator(int savingsPeriod, 
                          int startCapital, 
                          int monthlySavings, 
                          double yearlyYield, 
                          double govtIntRate = 1.25, 
                          int scheduledIncreasePeriod = 0, 
                          int scheduledIncrease = 0)
        {
            this.startCapital = startCapital;
            this.monthlySavings = monthlySavings;
            this.scheduledIncrease = scheduledIncrease;
            this.scheduledIncreasePeriod = scheduledIncreasePeriod;
            this.savingsPeriod = savingsPeriod;
            this.yearlyYield = yearlyYield;
            this.govtIntRate = govtIntRate;
        }

        /// <summary>
        /// Calculates how much money has been saved from the start to the end of the savings period.
        /// </summary>
        /// <returns>A list of Savings, where each element is the result from that year. 
        /// The index correlates to the year the results reflects</returns>
        public List<Savings> CalculateSavings()
        {
            List<Savings> results = new List<Savings>();
            /* Create a dummy Savings for the very start of the first year
             * Used mostly to give CalculateYearly "last year's" results to calculate on*/
            Savings lastYearsResults = new Savings(0, 0, 0, startCapital, startCapital, 0);

            for (int year = 0; year < savingsPeriod; year++)
            {
                if (year % scheduledIncreasePeriod == 0)
                {
                    monthlySavings += scheduledIncrease;
                }
                Savings thisYearsResults = CalulateYearly(lastYearsResults);
                results.Add(thisYearsResults);

                lastYearsResults = thisYearsResults;
            }

            return results;
        }

        /// <summary>
        /// Calulate this years savings, savings with yield and tax, based on last years results
        /// </summary>
        /// <param name="lastYearsResults">The last year's Savings, needed to know how much was saved last year</param>
        private Savings CalulateYearly(Savings lastYearsResults)
        {
            double thisYearsSavings = monthlySavings * 12;

            /* Start with annoying dumb stupid tax calculations
             * After each quarter, calculate the total worth of your account. Including yield/growth and any insert you've made
             * Add up each quarters results and send it off to the tax calculation
             */
            double qResultsTotal = 0;
            double lastQuarter = lastYearsResults.ResultWithYield;
            // for every quarter
            for (int i = 0; i < 4; i++)
            {
                lastQuarter = CalculateQuarterlyResults(lastQuarter);
                qResultsTotal += lastQuarter;
            }

            double thisYearsTax = CalculateTax(qResultsTotal);

            double moneySavedNoYield = lastYearsResults.ResultNoYield + thisYearsSavings;
            double moneySavedWithYield = lastYearsResults.ResultWithYield * yearlyYield + thisYearsSavings;
            return new Savings(lastYearsResults.Year + 1, 
                               govtIntRate, 
                               yearlyYield, 
                               (int)moneySavedWithYield, 
                               (int)moneySavedNoYield, 
                               (int)thisYearsTax);
        }

        /// <summary>
        /// Helper method for tax-calculations, figures out quartely worth
        /// </summary>
        /// <returns>How much the shares have grown + how much has been inserted </returns>
        private double CalculateQuarterlyResults(double savings)
        {
            double fourthOfYield = 1 + ((yearlyYield - 1) / 4);

            return savings * fourthOfYield + (monthlySavings * 3);
        }

        private double CalculateTax(double totalYearlyResult)
        {
            /*
             * Tax is calculated as the sum of all if the accounts year's quarter's worth (Q1 worth + Q2 worth...)
             * including any money that's been inserted
             * 
             * That's then divided by 4, mulitplied with the GOVT_INT_RATE (usually 1.25%) and finally 30% of that
             * https://www.avanza.se/lar-dig-mer/avanza-akademin/skatt-deklaration/hur-beskattas-ett-isk.html
             */
            return totalYearlyResult / 4 * (govtIntRate / 100) * 0.3;
        }
    }
}
