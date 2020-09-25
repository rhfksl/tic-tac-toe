import React, { useContext } from "react";
import { RowSquare } from "./Square";
import shortid from "shortid";
import { CurBoard } from './Interface/Interface';
import { TicTacToeContext } from './Context/TicTacToeStore';

export const Board: React.FunctionComponent<{}> = () => {

  const { histories, step } = useContext(TicTacToeContext);
  const curBoard: CurBoard = histories[step];
    
  return (
          <div className="board">
            {curBoard.map((row: (null | string)[], rowIdx: number) => {
              return <RowSquare key={shortid.generate()} row={row} rowIdx={rowIdx} />
            })}
          </div>
        );
}

