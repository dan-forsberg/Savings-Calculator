namespace Savings
{
    public readonly struct Savings
    {
        public readonly int Year { get; }
        public readonly double GovtIntRate { get; }
        public readonly double YearlyYield { get; }
        public readonly int ResultWithYield { get; }
        public readonly int ResultNoYield { get; }
        public readonly int ResultTax { get; }

        public Savings(int year, double govtIntRate, double yearlyYield, int resultWithYield, int resultNoYield, int resultTax)
        {
            Year = year;
            GovtIntRate = govtIntRate;
            YearlyYield = yearlyYield;
            ResultWithYield = resultWithYield;
            ResultNoYield = resultNoYield;
            ResultTax = resultTax;
        }
    }
}
