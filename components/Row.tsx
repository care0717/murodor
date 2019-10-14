import * as React from "react";
import styled from "styled-components";
import Square from "./Square";


const Main = styled.div`
  clear: both;
  content: "";
  display: table;
`
interface Props {
    size: number
    index: number
}

const Row = (props: Props) => {
    const range = (start: number, end: number) =>
        Array.from({ length: end - start }, (v, k) => k + start);
    return (
        <Main>
            {range(0, props.size).map(j => <Square>{""}</Square>)}
        </Main>
    )
}

export default Row;