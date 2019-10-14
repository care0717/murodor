import * as React from "react";
import Game from "../components/Game";

import { MainTitle, MainContent } from "../styled/Page";

export default class BlogsPage extends React.Component {
    static async getInitialProps(ctx: any) {

    }

    public render() {
        return (
            <MainContent>
                <MainTitle>Indian Curries</MainTitle>
                <Game />
            </MainContent>
        );
    }
}