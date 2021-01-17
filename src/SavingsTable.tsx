type SavingsTableProps = {
    savings: Savings[];
    maxTableLength: number;
}

type SavingsTableRowProps = {
    savings: Savings;
    key: number;
}

class SavingsTable extends React.Component<SavingsTableProps> {
    constructor(props: SavingsTableProps) {
        super(props);
    }

    render() {
        let everyNthRow: number = 1;
        let end = this.props.savings.length - 1;
        if (this.props.savings.length > this.props.maxTableLength) {
            everyNthRow = Math.round(this.props.savings.length / this.props.maxTableLength);
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
                        this.props.savings.map((saving: Savings, i: number) => {
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

class SavingsTableRow extends React.Component<SavingsTableRowProps> {
    constructor(props: SavingsTableRowProps) {
        super(props);
    }

    formatNumberNicely(value:number):string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    render() {
        let diffInProcent = Math.round((this.props.savings.resultWithYield / this.props.savings.resultNoYield) * 100);
        let wYield = this.formatNumberNicely(this.props.savings.resultWithYield);
        let noYield = this.formatNumberNicely(this.props.savings.resultNoYield);
        let row =
            <tr>
                <td>{this.props.savings.year}</td>
                <td>{wYield} kr</td>
                <td>{noYield} kr</td>
                <td>{diffInProcent}%</td>
            </tr>;
        return row;
    }
}