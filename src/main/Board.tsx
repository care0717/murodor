import * as React from "react";
import Channel from "./Channel";
import CrossSection from "./CrossSection";
import Square from "./Square";

interface State {
  squares: string[][];
  meIsNext: boolean;
}

interface Props {
  size: number;
}

enum Piece {
  ME = "O",
  ENEMY = "X",
  EMPTY = ""
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (v, k) => k + start);

class Board extends React.Component<Props, State> {
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
    const board = range(0, this.props.size - 1).map(i => [
      <div className="board-row" key={2 * i}>
        {this.renderRow(i)}
      </div>,
      i !== this.props.size - 1 ? this.renderChannelRow(i) : undefined
    ]);
    return (
      <div>
        <div className="status">{status}</div>
        {board}
      </div>
    );
  }

  private init(): string[][] {
    const squares = range(0, this.props.size - 1).map(_ =>
      Array(this.props.size).fill("")
    );
    const center = Math.floor(this.props.size / 2);
    squares[0][center] = Piece.ENEMY;
    squares[this.props.size - 1][center] = Piece.ME;
    return squares;
  }

  private renderChannelRow(i: number) {
    return (
      <div className="channel-row" key={2 * i + 1}>
        {range(0, this.props.size - 2).map(j => [
          <Channel direction="horizontal" key={2 * j} />,
          <CrossSection key={2 * j + 1} />
        ])}
        <Channel direction="horizontal" key={2 * (this.props.size - 1)} />
      </div>
    );
  }

  private renderRow(n: number) {
    const renderSquare = (i: number, j: number) => {
      return [
        <Square
          value={this.state.squares[i][j]}
          canMove={this.getAroundMe(this.getMyself(this.state.meIsNext)).some(
            list => list[0] === i && list[1] === j
          )}
          onClick={this.handleClick(i, j)}
          key={1}
        />,
        j !== this.props.size - 1 ? (
          <Channel direction="vertical" key={2} />
        ) : (
          undefined
        )
      ];
    };
    return range(0, this.props.size - 1).map(j => renderSquare(n, j));
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
    if (row < this.props.size - 1) {
      result.push([row + 1, column]);
    }
    if (column < this.props.size - 1) {
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
    for (const i of range(0, this.props.size - 1)) {
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
