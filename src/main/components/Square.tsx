import * as React from "react";
import { BoardActions, getBoardState } from "../interface";
import { useActions } from "typeless";

interface Props {
  row: number;
  column: number;
}

const Square = (props: Props) => {
  const { squareClick } = useActions(BoardActions);

  const { squares } = getBoardState.useState();

  const className = true ? "square can-click" : "square";
  const square = (
      <div className={className} onClick={squareClick}>
        {squares[props.row][props.column]}
      </div>
  );
  return square;
};

export default Square;
