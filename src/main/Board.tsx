import * as React from "react";
import Square from "./Square";

interface IState {
  squares: Array<string | null>;
  xIsNext: boolean;
}

class Board extends React.Component<{}, IState> {
  public state = {
    squares: Array(9).fill(null),
    xIsNext: true
  };
  public render() {
    const winner = this.calculateWinner(this.state.squares);
    const status =
      winner != null
        ? "Winner: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "O");
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  private renderSquare(i: number) {
    return (
      <Square value={this.state.squares[i]} onClick={this.handleClick(i)} />
    );
  }

  private handleClick(i: number): () => void {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) != null || squares[i] != null) {
      return () => undefined;
    }
    return () => {
      const squaresCopy = this.state.squares.slice();
      squaresCopy[i] = this.state.xIsNext ? "X" : "O";
      this.setState({ squares: squaresCopy, xIsNext: !this.state.xIsNext });
    };
  }
  private calculateWinner(squares: Array<string | null>) {
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
