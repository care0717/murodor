import * as React from "react";
import Board from "./Board";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
    margin-left: 20px;
`

const Game = () => {
    return (
        <Main>
            <Board size={9} />
            <Info>
                <div>{/* status */}</div>
            </Info>
        </Main>
    );
};

export default Game;