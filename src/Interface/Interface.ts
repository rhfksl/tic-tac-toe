export type Histories = (null | string)[][][];

export type CurBoard = (string|null)[][];

export type TicTacToeStates = {
    histories:Histories;
    isNextX: boolean;
    step: number;
    winner: null | string;
}
export interface StoreType{
    TicTacToeStates: TicTacToeStates
}

export interface TicTacToeContextType{
    histories:Histories;
    isNextX: boolean;
    step: number;
    winner: null | string;
    dispatch(action: ActionType): void;
}

export type ActionType = {
    type: string;
    payload: TicTacToeStates;
}

// export interface HistoryButtonsProps{
//     histories: Histories;
//     jumpHistory(step: number): void;
// }

// export interface BoardProps{
//     curBoard: CurBoard;
// }

export interface SquareProps{
    row: (string|null)[];
    rowIdx: number;
}