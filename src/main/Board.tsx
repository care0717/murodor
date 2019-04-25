import * as React from "react";
import Square from "./Square";

interface IState {
  squares: string[][];
  xIsNext: boolean;
}
const boardSize = 9;
const me = "O";
const enemy = "X";

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
        : "Next player: " + (this.state.xIsNext ? enemy : me);
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
    const squares = range(0, boardSize - 1).map(_ => Array(boardSize).fill(""));
    squares[0][4] = enemy;
    squares[boardSize - 1][4] = me;
    return squares;
  }

  private renderLow(n: number) {
    const renderSquare = (i: number, j: number) => {
      return (
        <Square
          value={this.state.squares[i][j]}
          canMove={this.getAroundMe().some(
            list => list[0] === i && list[1] === j
          )}
          onClick={this.handleClick(i, j)}
        />
      );
    };
    return range(0, boardSize - 1).map(j => renderSquare(n, j));
  }

  private handleClick(i: number, j: number): () => void {
    const squares = this.state.squares.slice();
    if (this.isFinished(squares)) {
      return () => undefined;
    }
    return () => {
      const squaresCopy = this.state.squares.slice();
      const [row, column] = this.getMe();
      squaresCopy[i][j] = me;
      squaresCopy[row][column] = "";
      this.setState({ squares: squaresCopy, xIsNext: this.state.xIsNext });
    };
  }
  private getAroundMe(): number[][] {
    const [row, column] = this.getMe();

    const result = [];
    if (row > 0) {
      result.push([row - 1, column]);
    }
    if (column > 0) {
      result.push([row, column - 1]);
    }
    if (row < boardSize - 1) {
      result.push([row + 1, column]);
    }
    if (column < boardSize - 1) {
      result.push([row, column + 1]);
    }
    return result;
  }

  private getMe(): number[] {
    const squares = this.state.squares.slice();
    let row: number = -1;
    let column: number = -1;
    for (const i of range(0, boardSize - 1)) {
      if (squares[i].includes(me)) {
        row = i;
        column = squares[i].indexOf(me);
        break;
      }
    }
    return [row, column];
  }

  private isFinished(squares: string[][]): boolean {
    return squares[0].includes(me);
  }

  private calculateWinner(squares: string[][]) {
    if (this.isFinished(squares)) {
      return me;
    }
    return null;
  }
}

export default Board;
