import * as React from "react";
import Channel from "./Channel";
import CrossSection from "./CrossSection";
import Square from "./Square";

import { isFinished } from "../module";
import { getBoardState } from "../interface";

interface Props {
  size: number;
}

enum Piece {
  ME = "O",
  ENEMY = "X",
  EMPTY = ""
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);

const Board = (props: Props) => {
  const { squares, meIsNext } = getBoardState.useState();

  const winner = calculateWinner(squares);
  const status =
    winner != null
      ? "Winner: " + winner
      : "Next player: " + getMyself(meIsNext);
  const board = range(0, props.size).map(i => [
    <div className="board-row" key={2 * i}>
      {renderRow(i)}
    </div>,
    i !== props.size - 1 ? renderChannelRow(i) : undefined
  ]);
  return (
    <div>
      <div className="status">{status}</div>
      {board}
    </div>
  );

  function renderChannelRow(i: number) {
    return (
      <div className="channel-row" key={2 * i + 1}>
        {range(0, props.size - 1).map(j => [
          <Channel
            row={2 * i}
            column={j}
            direction={"horizontal"}
            key={2 * j}
          />,
          <CrossSection row={i} column={j} key={2 * j + 1} />
        ])}
        <Channel
          row={2 * i + 1}
          column={props.size - 1}
          direction="horizontal"
          key={2 * (props.size - 1)}
        />
      </div>
    );
  }

  function renderRow(n: number) {
    const renderSquare = (i: number, j: number) => {
      return [
        <Square row={i} column={j} key={1} />,
        j !== props.size - 1 ? (
          <Channel row={2 * i} column={j} direction="vertical" key={2} />
        ) : (
          undefined
        )
      ];
    };
    return range(0, props.size).map(j => renderSquare(n, j));
  }

  function getMyself(whichIsNext: boolean): Piece {
    return whichIsNext ? Piece.ME : Piece.ENEMY;
  }
};

function calculateWinner(squares: string[][]) {
  if (isFinished(squares)) {
    return Piece.ME;
  }
  return null;
}

export default Board;
