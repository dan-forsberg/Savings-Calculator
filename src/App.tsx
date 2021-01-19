interface IAppProps {

}

interface IAppState {
    calc: Calculator | null;
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: ISavingsChartProps) {
        super(props);
        this.getFormData = this.getFormData.bind(this);
        this.state = {
            calc: null
        }
    }

    getFormData(formData: ISavingsFormState) {
        // the form gives you literal procent, so make 7% -> 1.07
        let profit = 1 + formData.profit / 100;
        let c = new Calculator(
            formData.startCapital,
            formData.period,
            formData.monthlySavings,
            profit,
            formData.schIncPer,
            formData.schInc);
        this.setState({ calc: c });
    }

    render() {
        let chart = (this.state.calc === null ? "" :
            <SavingsChart calculator={this.state.calc} />
        );
        let table = (this.state.calc === null ? "" :
            <SavingsTable calculator={this.state.calc} maxTableLength={15} />
        );

        let app =
            <div>
                <SavingsForm onSubmit={this.getFormData} />
                {chart}
                {table}
            </div>;
        return app;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));