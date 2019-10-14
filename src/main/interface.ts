import { createModule } from 'typeless';
import { BoardSymbol } from './symbol';

// initialize the module
export const [useModule, BoardActions, getBoardState] = createModule(BoardSymbol)
    .withActions({
        test: null,
        crossSectionClick: (i: number, j: number) => ({ payload: { i, j } }),
        channelClick: (i: number, j: number) => ({}),
        squareClick: (i: number, j: number) => ({ payload: { i, j } }),
    })
    //
    .withState<BoardState>();

export interface BoardState {
    squares: string[][];
    crossSections: boolean[][];
    canClickCrossSection: boolean;
    channels: boolean[][];
    canClickChannels: boolean[][];
    meIsNext: boolean;
    clickedCrossSection: number[];
}