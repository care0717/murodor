import React from "react";
import Board from "./components/Board";
import { useModule, BoardActions, BoardState } from "./interface";
import { Board } from "./components/Board";

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);

// Create Epic for side effects
useModule
  .epic()
  // Listen for `count` and dispatch `countDone` with 500ms delay
  .on(BoardActions.channelClick, (state, { i, j }) => {
    if (isFinished(state.squares)) {
      return () => undefined;
    }
    if (!state.canClickChannels[i][j]) {
      return () => undefined;
    }
    return () => {
      state.channels[i][j] = true;
      if (i % 2 === 0) {
        if (i / 2 === state.clickedCrossSection[0]) {
          state.channels[i + 2][j] = true;
        } else {
          state.channels[i - 2][j] = true;
        }
      } else {
        if (j === state.clickedCrossSection[1]) {
          state.channels[i][j + 1] = true;
        } else {
          state.channels[i][j - 1] = true;
        }
      }
      state.canClickChannels = channelInit(boradSize);
      state.canClickCrossSection = true;
      state.squares = moveCPU(state.squares);
    };
  });
enum Piece {
  ME = "O",
  ENEMY = "X",
  EMPTY = ""
}

const boradSize = 9;

const initialState: BoardState = {
  canClickChannels: channelInit(boradSize),
  canClickCrossSection: true,
  channels: channelInit(boradSize),
  clickedCrossSection: [],
  crossSections: crossSectionInit(boradSize),
  meIsNext: true,
  squares: squaresInit(boradSize)
};

function channelInit(size: number): boolean[][] {
  return range(0, 2 * size - 1).map(i =>
    Array(i % 2 === 0 ? size - 1 : size).fill(false)
  );
}

function crossSectionInit(size: number): boolean[][] {
  return range(0, 2 * size - 1).map(i =>
    Array(i % 2 === 0 ? size - 1 : size).fill(false)
  );
}

function squaresInit(size: number): string[][] {
  const squares = range(0, size).map(_ => Array(size).fill(""));
  const center = Math.floor(size / 2);
  squares[0][center] = Piece.ENEMY;
  squares[size - 1][center] = Piece.ME;
  return squares;
}

function getAroundMe(myself: Piece, squares: string[][]): number[][] {
  const [row, column] = getMePos(myself, squares);

  const result = [];
  if (row > 0) {
    result.push([row - 1, column]);
  }
  if (column > 0) {
    result.push([row, column - 1]);
  }
  if (row < boradSize - 1) {
    result.push([row + 1, column]);
  }
  if (column < boradSize - 1) {
    result.push([row, column + 1]);
  }
  return result.filter(list => {
    return squares[list[0]][list[1]] === Piece.EMPTY;
  });
}

function getMePos(myself: string, squares: string[][]): [number, number] {
  let row: number = -1;
  let column: number = -1;
  for (const i of range(0, boradSize)) {
    if (squares[i].includes(myself)) {
      row = i;
      column = squares[i].indexOf(myself);
      break;
    }
  }
  return [row, column];
}

export function isFinished(squares: string[][]): boolean {
  return squares[0].includes(Piece.ME);
}

function moveCPU(squares: string[][]) {
  const moveList = getAroundMe(Piece.ENEMY, squares);
  const index = Math.floor(Math.random() * moveList.length);
  const [r, c] = moveList[index];
  const [row, column] = getMePos(Piece.ENEMY, squares);
  squares[row][column] = "";
  squares[r][c] = Piece.ENEMY;
  return squares;
}

function moveMe(i: number, j: number, squares: string[][]) {
  const [row, column] = getMePos(Piece.ME, squares);
  squares[row][column] = "";
  squares[i][j] = Piece.ME;
  return squares;
}

// Create a reducer
// It's compatible with a standard reducer `(state, action) => state`
// Under the hood it uses `immer` and state mutations are allowed
useModule
  .reducer(initialState)
  .on(BoardActions.crossSectionClick, (state, { i, j }) => {
    if (!state.canClickCrossSection || state.crossSections[i][j]) {
      return;
    }

    if (
      (state.channels[2 * i][j] || state.channels[2 * i + 2][j]) &&
      (state.channels[2 * i + 1][j] || state.channels[2 * i + 1][j + 1])
    ) {
      return;
    }
    state.crossSections[i][j] = true;
    if (!state.channels[2 * i][j] && !state.channels[2 * i + 2][j]) {
      state.canClickChannels[2 * i][j] = true;
      state.canClickChannels[2 * i + 2][j] = true;
    }

    if (!state.channels[2 * i + 1][j] && !state.channels[2 * i + 1][j + 1]) {
      state.canClickChannels[2 * i + 1][j] = true;
      state.canClickChannels[2 * i + 1][j + 1] = true;
    }
  })
  .on(BoardActions.channelClick, (state, { i, j }) => {
    if (isFinished(state.squares)) {
      return () => undefined;
    }
    if (!state.canClickChannels[i][j]) {
      return () => undefined;
    }
    return () => {
      state.channels[i][j] = true;
      if (i % 2 === 0) {
        if (i / 2 === state.clickedCrossSection[0]) {
          state.channels[i + 2][j] = true;
        } else {
          state.channels[i - 2][j] = true;
        }
      } else {
        if (j === state.clickedCrossSection[1]) {
          state.channels[i][j + 1] = true;
        } else {
          state.channels[i][j - 1] = true;
        }
      }
      state.canClickChannels = channelInit(boradSize);
      state.canClickCrossSection = true;
      state.squares = moveCPU(state.squares);
    };
  })
  .on(BoardActions.squareClick, (state, { i, j }) => {
    if (isFinished(state.squares)) {
      return;
    }
    return () => {
      const squaresCopy = moveMe(i, j, state.squares);
      state.squares = moveCPU(squaresCopy);
    };
  });

// Entry point component for this module
export default function BoardModule() {
  // load epic and reducer
  useModule();

  return <Board size={boradSize} />;
}
