# Basic savings calculator
This basic savings calculator allows you to get a rough idea of how much your money can grow on the stock market. Other calculators I've seen have not allowed you to increase the monthly savings after X many years, as would probably be the case if you're saving for retirement or any other long term.

I first made a simple one as a Console Application in C\#, but with no UI to talk of. I wanted to try out TypeScript and React, so I made it in TS and using React for some UI-components. Git history shows that it started off as a C\#-project. A lot of commits are nonsense, mostly to get it published to Netlify and because commit messages are hard.

The graph/chart is made using Chart.JS. The form and table is made using React.

# TODO
Code is not perfect, currently Form.tsx is also a parent to Table.tsx and also interacts with Calculator.ts. Would like to make a parent for Form.tsx so it's just responsible for the form.

Probably needs to be cleaned up and refactored.

Comments and documentation.

Testing and validation of input.

# Deployed version
[Link to Netlify](https://vigorous-sammet-7ab0ff.netlify.app/)