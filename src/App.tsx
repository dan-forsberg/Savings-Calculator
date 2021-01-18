interface IAppProps {

}

interface IAppState{
    startCap: number;
    moSav: number;
    period: number;
    yield: number;
    schIncPer: number;
    schInc: number;
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: ISavingsChartProps) {
        super(props);
    }

    render() {
        let app =
            <div>
                <SavingsForm />
            </div>;

        return app;
    }
}