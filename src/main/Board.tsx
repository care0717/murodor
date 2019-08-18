import * as React from "react";
import Channel from "./Channel";
import CrossSection from "./CrossSection";
import Square from "./Square";

interface State {
  squares: string[][];
  crossSections: boolean[][];
  canClickCrossSection: boolean;
  channels: boolean[][];
  canClickChannels: boolean[][];
  meIsNext: boolean;
  clickedCrossSection: number[];
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
  Array.from({ length: end - start }, (v, k) => k + start);

class Board extends React.Component<Props, State> {
  public state = {
    canClickChannels: this.channelInit(),
    canClickCrossSection: true,
    channels: this.channelInit(),
    clickedCrossSection: [],
    crossSections: this.crossSectionInit(),
    meIsNext: true,
    squares: this.squaresInit()
  };

  public render() {
    const winner = this.calculateWinner(this.state.squares);
    const status =
      winner != null
        ? "Winner: " + winner
        : "Next player: " + this.getMyself(this.state.meIsNext);
    const board = range(0, this.props.size).map(i => [
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

  private channelInit(): boolean[][] {
    return range(0, 2 * this.props.size - 1).map(i =>
      Array(i % 2 === 0 ? this.props.size - 1 : this.props.size).fill(false)
    );
  }

  private crossSectionInit(): boolean[][] {
    return range(0, 2 * this.props.size - 1).map(i =>
      Array(i % 2 === 0 ? this.props.size - 1 : this.props.size).fill(false)
    );
  }

  private squaresInit(): string[][] {
    const squares = range(0, this.props.size).map(_ =>
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
        {range(0, this.props.size - 1).map(j => [
          <Channel
            canClick={this.state.canClickChannels[2 * i + 1][j]}
            putted={this.state.channels[2 * i + 1][j]}
            onClick={this.channelClick(2 * i + 1, j)}
            direction="horizontal"
            key={2 * j}
          />,
          <CrossSection
            onClick={this.crossSectionClick(i, j)}
            putted={this.state.crossSections[i][j]}
            key={2 * j + 1}
          />
        ])}
        <Channel
          canClick={this.state.canClickChannels[2 * i + 1][this.props.size - 1]}
          putted={this.state.channels[2 * i + 1][this.props.size - 1]}
          onClick={this.channelClick(2 * i + 1, this.props.size - 1)}
          direction="horizontal"
          key={2 * (this.props.size - 1)}
        />
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
          onClick={this.squareClick(i, j)}
          key={1}
        />,
        j !== this.props.size - 1 ? (
          <Channel
            canClick={this.state.canClickChannels[2 * i][j]}
            putted={this.state.channels[2 * i][j]}
            onClick={this.channelClick(2 * i, j)}
            direction="vertical"
            key={2}
          />
        ) : (
          undefined
        )
      ];
    };
    return range(0, this.props.size).map(j => renderSquare(n, j));
  }

  private crossSectionClick(i: number, j: number): () => void {
    if (this.isFinished(this.state.squares)) {
      return () => undefined;
    }
    const crossSections = this.state.crossSections.slice();
    const canClickChannels = this.state.canClickChannels.slice();

    if (!this.state.canClickCrossSection || crossSections[i][j]) {
      return () => undefined;
    }

    if (
      (this.state.channels[2 * i][j] || this.state.channels[2 * i + 2][j]) &&
      (this.state.channels[2 * i + 1][j] ||
        this.state.channels[2 * i + 1][j + 1])
    ) {
      return () => undefined;
    }

    return () => {
      crossSections[i][j] = true;
      if (
        !this.state.channels[2 * i][j] &&
        !this.state.channels[2 * i + 2][j]
      ) {
        canClickChannels[2 * i][j] = true;
        canClickChannels[2 * i + 2][j] = true;
      }

      if (
        !this.state.channels[2 * i + 1][j] &&
        !this.state.channels[2 * i + 1][j + 1]
      ) {
        canClickChannels[2 * i + 1][j] = true;
        canClickChannels[2 * i + 1][j + 1] = true;
      }

      this.setState({
        canClickChannels,
        canClickCrossSection: false,
        clickedCrossSection: [i, j],
        crossSections
      });
    };
  }

  private channelClick(i: number, j: number): () => void {
    if (this.isFinished(this.state.squares)) {
      return () => undefined;
    }
    if (!this.state.canClickChannels[i][j]) {
      return () => undefined;
    }
    const channels = this.state.channels.slice();
    return () => {
      channels[i][j] = true;
      if (i % 2 === 0) {
        if (i / 2 === this.state.clickedCrossSection[0]) {
          channels[i + 2][j] = true;
        } else {
          channels[i - 2][j] = true;
        }
      } else {
        if (j === this.state.clickedCrossSection[1]) {
          channels[i][j + 1] = true;
        } else {
          channels[i][j - 1] = true;
        }
      }

      this.setState({
        canClickChannels: this.channelInit(),
        canClickCrossSection: true,
        channels
      });
      this.setState({
        squares: this.moveCPU(this.state.squares.slice())
      });
    };
  }

  private squareClick(i: number, j: number): () => void {
    if (this.isFinished(this.state.squares)) {
      return () => undefined;
    }
    return () => {
      let squaresCopy = this.moveMe(i, j);
      squaresCopy = this.moveCPU(squaresCopy);

      this.setState({ squares: squaresCopy });
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
    for (const i of range(0, this.props.size)) {
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
