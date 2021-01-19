interface ISavingsTableProps {
    calculator: Calculator;
    maxTableLength: number;
}

interface ISavingsTableState {
    savings: Savings[];
}

interface ISavingsTableRowProps {
    savings: Savings;
    key: number;
}

class SavingsTable extends React.Component<ISavingsTableProps, ISavingsTableState> {
    constructor(props: ISavingsTableProps) {
        super(props);
        this.state = {
            savings: this.props.calculator.calculateSavings()
        };
    }

    render() {
        let everyNthRow: number = 1;
        let end = this.state.savings.length - 1;
        if (this.state.savings.length > this.props.maxTableLength) {
            everyNthRow = Math.round(this.state.savings.length / this.props.maxTableLength);
        }
        
        let table =
            <table>
                <thead>
                    <tr>
                        <th>År</th>
                        <th>Med avkastning</th>
                        <th>Utan avkastning</th>
                        <th>Skillnad i %</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.savings.map((saving: Savings, i: number) => {
                            if (i % everyNthRow == 0 || i == 0 || i == end) {
                                return (<SavingsTableRow key={i} savings={saving} />);
                            } else {
                                return null;
                            }
                        })
                    }
                </tbody>
            </table>;

        return table;
    }
}

class SavingsTableRow extends React.Component<ISavingsTableRowProps> {
    constructor(props: ISavingsTableRowProps) {
        super(props);
    }

    formatNumberNicely(value:number):string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    render() {
        let diffInProcent = Math.round((this.props.savings.resultWithProfit / this.props.savings.resultNoProfit) * 100);
        let withProfit = this.formatNumberNicely(this.props.savings.resultWithProfit);
        let noProfit = this.formatNumberNicely(this.props.savings.resultNoProfit);
        let row =
            <tr>
                <td>{this.props.savings.year}</td>
                <td>{withProfit} kr</td>
                <td>{noProfit} kr</td>
                <td>{diffInProcent}%</td>
            </tr>;
        return row;
    }
}