import React, { useContext } from "react";
import { Square } from "./Square";
import shortid from "shortid";
import { BoardProps } from './Interface/Interface';
import { TicTacToeContext } from './Context/TicTacToeStore';

export const Board: React.FunctionComponent<BoardProps> = props => {
  const { curBoard, clickBoard } = props;
  // const { clickBoard } = props;
  // const { histories, step, dispatch }: any = useContext(TicTacToeContext);
  // const curBoard = histories[step];
  
    
  return (
          <div className="board">
            {curBoard.map((row: (null | string)[], rowIdx: number) => {
              return <Square key={shortid.generate()} row={row} rowIdx={rowIdx} clickBoard={clickBoard} />
            })}
          </div>
        );
}

