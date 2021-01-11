using System;
using System.Collections.Generic;
using System.Text;

namespace Pension
{
    class Savings
    {
        public int startCapital { get; set; }
        public int monthlySavings { get; set; }
        public int scheduledIncrease { get; set; }
        public int scheduledIncreasePeriod { get; set; }
        public int savingsPeriod { get; set; }
        public double yearlyYield { get; set; }

        // the govt interest rate is used in the tax calculations, but it cannot be lower than 1.25%, which is usually is so assume it will stay at 1.25%
        public const double govtInterestRate = 1.25;
        // "helper" variables, keep track of the absolute total
        private double moneySavedNoYield = 0;
        private double moneySavedWithYield = 0;

        // yearly result variables
        // these are ints instead of doubles like above to do the rounding in the very last step
        private readonly List<int> yearlyResult = new List<int>();
        private readonly List<int> yearlyTax = new List<int>();
        private readonly List<int> yearlyResultNoYield = new List<int>();

        public void CalculateSavings()
        {
            moneySavedNoYield = startCapital;
            moneySavedWithYield = startCapital;

            for (int year = 0; year < savingsPeriod; year++)
            {
                if (year % scheduledIncreasePeriod == 0)
                {
                    monthlySavings += scheduledIncrease;
                }

                CalulateYearly();
            }
        }

        public List<int> GetYearlyResults()
        {
            return yearlyResult;
        }

        public List<int> GetYearlyResultNoYield()
        {
            return yearlyResultNoYield;
        }

        public List<int> GetYearlyTaxes()
        {
            return yearlyTax;
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
        private void CalulateYearly()
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

            yearlyResult.Add((int)moneySavedWithYield);
            yearlyResultNoYield.Add((int)moneySavedNoYield);
            yearlyTax.Add((int)thisYearsTax);
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
             * That's then divided by 4, mulitplied with the govtInterestRate (usually 1.25%) and finally 30% of that
             * https://www.avanza.se/lar-dig-mer/avanza-akademin/skatt-deklaration/hur-beskattas-ett-isk.html
             */
            return ((totalYearlyResult / 4) * (govtInterestRate/100)) * 0.3;
        }
    }
}
