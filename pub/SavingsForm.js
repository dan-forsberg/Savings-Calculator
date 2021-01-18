"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var SavingsForm = /** @class */ (function (_super) {
    __extends(SavingsForm, _super);
    function SavingsForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            startCap: 10000,
            moSav: 250,
            period: 40,
            yield: 7,
            schIncPer: 0,
            schInc: 0
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.displayResults();
        return _this;
    }
    SavingsForm.prototype.render = function () {
        var form = React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement("label", { htmlFor: "startCap" }, "Startkapital"),
            React.createElement("input", { name: "startCap", type: "number", min: "0", value: this.state.startCap, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "moSav" }, "M\u00E5nadsparande"),
            React.createElement("input", { name: "moSav", type: "number", min: "0", value: this.state.moSav, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "period" },
                "Antal \u00E5r: ",
                this.state.period),
            React.createElement("input", { name: "period", type: "range", min: "1", max: "100", step: "1", value: this.state.period, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "yield" },
                "Avkastning per \u00E5r: ",
                this.state.yield,
                "%"),
            React.createElement("input", { name: "yield", type: "range", min: "0", max: "50", step: "0.5", value: this.state.yield, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "schIncPer" },
                "Vart ",
                this.state.schIncPer,
                " \u00E5r \u00F6kar m\u00E5nadssparandet..."),
            React.createElement("input", { name: "schIncPer", type: "number", min: "0", max: "100", value: this.state.schIncPer, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "schInc" },
                "...med ",
                this.state.schInc,
                " kr"),
            React.createElement("input", { name: "schInc", type: "number", min: "0", value: this.state.schInc, onChange: this.handleChange }),
            React.createElement("input", { className: "btn-small", id: "submit", type: "submit", value: "R\u00E4kna" }));
        return form;
    };
    SavingsForm.prototype.handleChange = function (e) {
        var _a;
        var value = e.target.value;
        this.setState(__assign(__assign({}, this.state), (_a = {}, _a[e.target.name] = parseFloat(value), _a)));
    };
    SavingsForm.prototype.handleSubmit = function (e) {
        e.preventDefault();
        this.displayResults();
    };
    // TODO: This feels ugly and bad, not ReactJS-y at all
    SavingsForm.prototype.displayResults = function () {
        /* Create SavingsTable */
        var results = this.calculateSavings();
        ReactDOM.render(React.createElement(SavingsTable, { savings: results, maxTableLength: 15 }), document.getElementById("savingsTable"));
    };
    SavingsForm.prototype.calculateSavings = function () {
        var yd = (this.state.yield / 100) + 1;
        var calc = new Calculator(this.state.startCap, this.state.period, this.state.moSav, yd, this.state.schIncPer, this.state.schInc);
        return calc.calculateSavings();
    };
    return SavingsForm;
}(React.Component));
