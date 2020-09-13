export type Histories = (null | string)[][][];

export type CurBoard = (string|null)[][];

export interface TicTacToeStates{
  histories:Histories;
  isNextX: boolean;
  step: number;
  playHistories: boolean;
  winner: null | string;
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