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
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.getFormData = _this.getFormData.bind(_this);
        _this.state = {
            calc: null
        };
        return _this;
    }
    App.prototype.getFormData = function (formData) {
        // the form gives you literal procent, so make 7% -> 1.07
        var profit = 1 + formData.profit / 100;
        var c = new Calculator(formData.startCapital, formData.period, formData.monthlySavings, profit, formData.schIncPer, formData.schInc);
        this.setState({ calc: c });
    };
    App.prototype.render = function () {
        var chart = (this.state.calc === null ? "" :
            React.createElement(SavingsChart, { calculator: this.state.calc }));
        var table = (this.state.calc === null ? "" :
            React.createElement(SavingsTable, { calculator: this.state.calc, maxTableLength: 9 }));
        var app = React.createElement("div", null,
            React.createElement(SavingsForm, { onSubmit: this.getFormData }),
            chart,
            table);
        return app;
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
