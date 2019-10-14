import * as React from "react";
import Row from "./Row";

interface Props {
    size: number;
}

const range = (start: number, end: number) =>
    Array.from({ length: end - start }, (v, k) => k + start);



const Board = (props: Props) => {
    const board = range(0, props.size).map(i => [
        <Row index={i} size={props.size} key={2*i}>
            {i}
        </Row>
    ]);
    return (
        <div>
            <div className="status"></div>
            {board}
        </div>
    );

};

export default Board;
