import * as React from "react";
import Square from "./Square";

interface IState {
  squares: string[][];
  xIsNext: boolean;
}
const boardSize = 9;

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (v, k) => k + start);

class Board extends React.Component<{}, IState> {
  public state = {
    squares: this.init(),
    xIsNext: false
  };

  public render() {
    const winner = this.calculateWinner(this.state.squares);
    const status =
      winner != null
        ? "Winner: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "O");
    const board = range(0, boardSize - 1).map(i => (
      <div className="board-row">{this.renderLow(i)}</div>
    ));
    return (
      <div>
        <div className="status">{status}</div>
        {board}
      </div>
    );
  }

  private init(): string[][] {
    const squares = range(0, boardSize).map(_ => Array(boardSize).fill(""));
    squares[0][4] = "X";
    squares[boardSize - 1][4] = "O";
    return squares;
  }

  private renderLow(n: number) {
    console.log(this.state.squares);
    const renderSquare = (i: number, j: number) => {
      return (
        <Square
          value={this.state.squares[i][j]}
          onClick={this.handleClick(i, j)}
        />
      );
    };
    return range(0, boardSize - 1).map(j => renderSquare(n, j));
  }

  private handleClick(i: number, j: number): () => void {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) != null || squares[i][j] != null) {
      return () => undefined;
    }
    return () => {
      const squaresCopy = this.state.squares.slice();
      squaresCopy[i][j] = this.state.xIsNext ? "X" : "O";
      this.setState({ squares: squaresCopy, xIsNext: !this.state.xIsNext });
    };
  }

  private calculateWinner(squares: string[][]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

export default Board;
