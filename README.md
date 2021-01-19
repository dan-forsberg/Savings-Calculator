# Basic savings calculator
This basic savings calculator allows you to get a rough idea of how much your money can grow on the stock market. Other calculators I've seen have not allowed you to increase the monthly savings after X many years, as would probably be the case if you're saving for retirement or any other long term.

I first made a simple one as a Console Application in C\#, but with no UI to talk of. I wanted to try out TypeScript and React, so I made it in TS and using React for some UI-components. Git history shows that it started off as a C\#-project. A lot of commits are nonsense, mostly to get it published to Netlify and because commit messages are hard.

The graph/chart is made using Chart.JS. The form and table is made using React.

# Design
The calculation is made with Calculator.ts. It takes parameters like a start capital, monthly savings and profit (how much the stock market grows yearly).
It basically does `(start_capital + monthly_savings) * profit^years`, except in a for loop. This is because the monthly profit can increase which is the whole idea of the project.

Every instance of calculator uses the same parameters, so `calculateSavings()` actually "caches" it's results to avoid doing the same calculations more than once. This is made use of in `SavingsChart.tsx` and `SavingsTable.tsx`.

`App.tsx` is the parent to all elements. When the `Form` is submitted it sends its state back to `App` through a callback. App then renders the table and chart.
`App` sends a `Calculator` instance as a prop to both the table and chart component. They can then get the an array of `Savings` through `calculateSavings()` which is cached, so both components don't trigger an actual calculation.


# TODO
~~Code is not perfect, currently Form.tsx is also a parent to Table.tsx and also interacts with Calculator.ts. Would like to make a parent for Form.tsx so it's just responsible for the form.~~
Now App.tsx is the parent to {SavingsForm.tsx, SavingsChart.tsx, SavingsTable.tsx}. 

However chart doesn't actually render until it's been rendered the first time. This is because it requires to know the canvas context, but it cannot until the actual <canvas> has been rendered.

Probably needs to be cleaned up and refactored.

Comments and documentation.

Testing and validation of input.

# Deployed version
[Link to Netlify](https://vigorous-sammet-7ab0ff.netlify.app/)