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

        public Calculator(int savingsPeriod, int startCapital, int monthlySavings, int scheduledIncrease, 
                          int scheduledIncreasePeriod, double yearlyYield, double govtIntRate = 1.25)
        {
            this.startCapital = startCapital;
            this.monthlySavings = monthlySavings;
            this.scheduledIncrease = scheduledIncrease;
            this.scheduledIncreasePeriod = scheduledIncreasePeriod;
            this.savingsPeriod = savingsPeriod;
            this.yearlyYield = yearlyYield;
            this.govtIntRate = govtIntRate;
        }

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
                Savings thisYearsResults = CalulateYearly(year, lastYearsResults.ResultWithYield, lastYearsResults.ResultNoYield);
                results.Add(thisYearsResults);

                lastYearsResults = thisYearsResults;
            }

            return results;
        }

        /// <summary>
        /// Calulate this years savings, savings with yield and tax. Modifies class members.
        /// </summary>
        /// Calculate how much the shares are worth from last years yield, save to yearlyResult
        /// Sum up this years savings, with no yield, save to yearlyResult
        /// Add just the amount saved this year to yearlyResultNoYield
        /// 
        /// Calculate the total of this years quarterly results, for taxes
        /// Calculate the tax for this year
        /// Add the taxes to yearlyTax
        /// </summary>
        private Savings CalulateYearly(int year, double moneySavedWithYield, double moneySavedNoYield)
        {
            /* Start with annoying dumb stupid tax calculations
             * After each quarter, calculate the total worth of your account. Including yield/growth and any insert you've made
             * Add up each quarters results and send it off to the tax calculation
             */
            double qResultsTotal = 0;
            double lastQuarter = moneySavedWithYield;
            // for every quarter
            for (int i = 0; i < 4; i++)
            {
                lastQuarter = CalculateQuarterlyResults(lastQuarter);
                qResultsTotal += lastQuarter;
            }

            double thisYearsTax = CalculateTax(qResultsTotal);

            /* add this years total saved to moneySavedTotal
             * 
             * calculate last years yeild of the moneySavedWithYield
             * add this years total saved to moneySavedWithYield so it can be grown next year
             */
            double thisYearsSavings = monthlySavings * 12;
            moneySavedNoYield += thisYearsSavings;
            moneySavedWithYield *= yearlyYield;
            moneySavedWithYield += thisYearsSavings;

            return new Savings(year, govtIntRate, yearlyYield, (int)moneySavedWithYield, (int)moneySavedNoYield, (int)thisYearsTax);
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
