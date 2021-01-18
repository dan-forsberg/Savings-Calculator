interface IProps {

}

interface IState {
    startCap: number;
    moSav: number;
    period: number;
    yield: number;
    schIncPer: number;
    schInc: number;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
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