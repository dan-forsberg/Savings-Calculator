class SavingsForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            startCap: 10000,
            moSav: 250,
            period: 40,
            yield: 7,
            schIncPer: 0,
            schInc: 0,
            govtIntRate: 1.25
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let form =
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="startCap">Startkapital</label>
                <input name="startCap" type="number" min="0"
                    value={this.state.startCap} onChange={this.handleChange} />

                <label htmlFor="moSav">Månadsparande</label>
                <input name="moSav" type="number" min="0"
                    value={this.state.moSav} onChange={this.handleChange} />

                <label htmlFor="period">Antal år: {this.state.period}<output></output></label>
                <input name="period" type="range" min="1" max="100" step="1"
                    value={this.state.period} onChange={this.handleChange} />

                <label htmlFor="yield">Avkastning per år: {this.state.yield}%</label>
                <input name="yield" type="range" min="0" max="50" step="0.5"
                    value={this.state.yield} onChange={this.handleChange} />

                <label className="boring" htmlFor="schIncPer">Hur ofta ökar sparandet per år?</label>
                <input className="boring" name="schIncPer" type="number" min="0" max="100"
                    value={this.state.schIncPer} onChange={this.handleChange} />

                <label className="boring" htmlFor="schInc">Hur mycket ökar månadsparande?</label>
                <input className="boring" name="schInc" type="number" min="0"
                    value={this.state.schInc} onChange={this.handleChange} />

                <label className="boring" htmlFor="govtIntRate">Förväntad skatt</label>
                <input className="boring" name="govtIntRate" type="number" min="1.25"
                    value={this.state.govtIntRate} onChange={this.handleChange} />
                <input type="submit" value="Räkna" />
            </form>
        return form;
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let yd: number = (this.state.yield / 100) + 1;
        calculate(this.state.startCap, this.state.period, this.state.moSav, yd, this.state.schIncPer, this.state.schInc, this.state.govtIntRate);
    }
}

ReactDOM.render(<SavingsForm />, document.getElementById("savingsForm"));