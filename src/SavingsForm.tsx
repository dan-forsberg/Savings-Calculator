/*
TODO: validate input
*/
interface ISavingsFormProps {
    onSubmit: Function;
}

interface ISavingsFormState {
    startCapital: number;
    monthlySavings: number;
    period: number;
    profit: number;
    /* scheduledIncreasePeriod - how /often/ should monthlySavings be increased*/
    schIncPer: number;
    /* scheduledIncrease - how /much/ should monthlySavings be increased */
    schInc: number;
}

class SavingsForm extends React.Component<ISavingsFormProps, ISavingsFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            startCapital: 10000,
            monthlySavings: 250,
            period: 40,
            profit: 7,
            schIncPer: 0,
            schInc: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        /* ugly/bad? "Forcefully" send state to parent to render table and chart */
        this.props.onSubmit(this.state);
    }

    render() {
        let form =
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="startCap">Startkapital</label>
                <input name="startCap" type="number" min="0"
                    value={this.state.startCapital} onChange={this.handleChange} />
                <label htmlFor="moSav">Månadsparande</label>
                <input name="moSav" type="number" min="0"
                    value={this.state.monthlySavings} onChange={this.handleChange} />

                <label htmlFor="period">Antal år: {this.state.period}</label>
                <input name="period" type="range" min="1" max="100" step="1"
                    value={this.state.period} onChange={this.handleChange} />

                <label htmlFor="profit">Avkastning per år: {this.state.profit}%</label>
                <input name="profit" type="range" min="0" max="50" step="0.5"
                    value={this.state.profit} onChange={this.handleChange} />

                <label htmlFor="schIncPer">Vart {this.state.schIncPer} år ökar månadssparandet...</label>
                <input name="schIncPer" type="number" min="0" max="100"
                    value={this.state.schIncPer} onChange={this.handleChange} />

                <label htmlFor="schInc">...med {this.state.schInc} kr</label>
                <input name="schInc" type="number" min="0"
                    value={this.state.schInc} onChange={this.handleChange} />
                <input className="btn-small" id="submit" type="submit" value="Räkna" />
            </form>
        return form;
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            /* all input is a number or float, needs to cast to a number otherwise something breaks */
            [e.target.name]: parseFloat(value)
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    calculateSavings(): ISavings[] {
        let yd: number = (this.state.profit / 100) + 1;
        let calc = new Calculator(this.state.startCapital, this.state.period, this.state.monthlySavings, yd, this.state.schIncPer, this.state.schInc);
        return calc.calculateSavings();
    }
}
