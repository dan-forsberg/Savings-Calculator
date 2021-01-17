"use strict";
class SavingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startCap: 10000,
            moSav: 250,
            period: 40,
            yield: 7,
            schIncPer: 0,
            schInc: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        let form = React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement("label", { htmlFor: "startCap" }, "Startkapital"),
            React.createElement("input", { name: "startCap", type: "number", min: "0", value: this.state.startCap, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "moSav" }, "M\u00E5nadsparande"),
            React.createElement("input", { name: "moSav", type: "number", min: "0", value: this.state.moSav, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "period" },
                "Antal \u00E5r: ",
                this.state.period,
                React.createElement("output", null)),
            React.createElement("input", { name: "period", type: "range", min: "1", max: "100", step: "1", value: this.state.period, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "yield" },
                "Avkastning per \u00E5r: ",
                this.state.yield,
                "%"),
            React.createElement("input", { name: "yield", type: "range", min: "0", max: "50", step: "0.5", value: this.state.yield, onChange: this.handleChange }),
            React.createElement("label", { className: "boring", htmlFor: "schIncPer" }, "Hur ofta \u00F6kar sparandet?"),
            React.createElement("input", { className: "boring", name: "schIncPer", type: "number", min: "0", max: "100", value: this.state.schIncPer, onChange: this.handleChange }),
            React.createElement("label", { className: "boring", htmlFor: "schInc" }, "Hur mycket \u00F6kar sparande?"),
            React.createElement("input", { className: "boring", name: "schInc", type: "number", min: "0", value: this.state.schInc, onChange: this.handleChange }),
            React.createElement("input", { type: "submit", value: "R\u00E4kna" }));
        return form;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState(Object.assign(Object.assign({}, this.state), { 
            /* all input is a number or float, needs to cast to a number otherwise something breaks */
            [e.target.name]: parseFloat(value) }));
    }
    handleSubmit(e) {
        e.preventDefault();
        let yd = (this.state.yield / 100) + 1;
        calculate(this.state.startCap, this.state.period, this.state.moSav, yd, this.state.schIncPer, this.state.schInc);
    }
}
ReactDOM.render(React.createElement(SavingsForm, null), document.getElementById("savingsForm"));
