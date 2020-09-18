export type Histories = (null | string)[][][];

export type CurBoard = (string|null)[][];

export type TicTacToeStates = {
    histories:Histories;
    isNextX: boolean;
    step: number;
    winner: null | string;
}
export interface TicTacToeStatesType{
    TicTacToeStates: TicTacToeStates
}
export type dispatchArgs = {
    type: string;
    payload: TicTacToeStates
}
export interface TicTacToeContextType{
    histories:Histories;
    isNextX: boolean;
    step: number;
    winner: null | string;
    dispatch(dispatchArgs: dispatchArgs): TicTacToeStatesType;
}

export interface HistoryButtonsProps{
    histories: Histories;
    jumpHistory(step: number): void;
}

export interface BoardProps{
    clickBoard(step: number): void;
    curBoard: CurBoard;
}

export interface SquareProps{
    clickBoard(step: number): void;
    row: (string|null)[];
    rowIdx: number;
}