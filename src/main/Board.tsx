import * as React from "react";
import Square from "./Square";

interface IState {
  squares: string[][];
  meIsNext: boolean;
}
const boardSize = 9;
enum Piece {
  ME = "O",
  ENEMY = "X",
  EMPTY = ""
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (v, k) => k + start);

class Board extends React.Component<{}, IState> {
  public state = {
    meIsNext: true,
    squares: this.init()
  };

  public render() {
    const winner = this.calculateWinner(this.state.squares);
    const status =
      winner != null
        ? "Winner: " + winner
        : "Next player: " + this.getMyself(this.state.meIsNext);
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
    const center = Math.floor(boardSize / 2);
    squares[0][center] = Piece.ENEMY;
    squares[boardSize - 1][center] = Piece.ME;
    return squares;
  }

  private renderLow(n: number) {
    const renderSquare = (i: number, j: number) => {
      return (
        <Square
          value={this.state.squares[i][j]}
          canMove={this.getAroundMe(this.getMyself(this.state.meIsNext)).some(
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
      let squaresCopy = this.moveMe(i, j);
      squaresCopy = this.moveCPU(squaresCopy);

      this.setState({ squares: squaresCopy, meIsNext: this.state.meIsNext });
    };
  }

  private moveCPU(squares: string[][]) {
    const moveList = this.getAroundMe(Piece.ENEMY);
    const index = Math.floor(Math.random() * moveList.length);
    const [r, c] = moveList[index];
    const [row, column] = this.getMePos(Piece.ENEMY);
    squares[row][column] = "";
    squares[r][c] = Piece.ENEMY;
    return squares;
  }

  private moveMe(i: number, j: number) {
    const squaresCopy = this.state.squares.slice();
    const [row, column] = this.getMePos(Piece.ME);
    squaresCopy[row][column] = "";
    squaresCopy[i][j] = Piece.ME;
    return squaresCopy;
  }

  private getMyself(whichIsNext: boolean): Piece {
    return whichIsNext ? Piece.ME : Piece.ENEMY;
  }

  private getAroundMe(myself: Piece): number[][] {
    const [row, column] = this.getMePos(myself);

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
    return result.filter(list => {
      return this.state.squares[list[0]][list[1]] === Piece.EMPTY;
    });
  }

  private getMePos(myself: string): number[] {
    const squares = this.state.squares.slice();
    let row: number = -1;
    let column: number = -1;
    for (const i of range(0, boardSize - 1)) {
      if (squares[i].includes(myself)) {
        row = i;
        column = squares[i].indexOf(myself);
        break;
      }
    }
    return [row, column];
  }

  private isFinished(squares: string[][]): boolean {
    return squares[0].includes(Piece.ME);
  }

  private calculateWinner(squares: string[][]) {
    if (this.isFinished(squares)) {
      return Piece.ME;
    }
    return null;
  }
}

export default Board;
