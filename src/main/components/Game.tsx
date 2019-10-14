import * as React from "react";
import Board from "./Board";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board size={9} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
