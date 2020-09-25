import React from "react";
import { Square } from "./Square";
import shortid from "shortid";

interface BoardProps{
  clickBoard(step: number): void;
  curBoard: (string|null)[][];
}

export const Board: React.FunctionComponent<BoardProps> = props => {
  const { curBoard, clickBoard } = props;  
    
  return (
          <div className="board">
            {curBoard.map((row: (null | string)[], rowIdx: number) => {
              return <Square key={shortid.generate()} row={row} rowIdx={rowIdx} clickBoard={clickBoard} />
            })}
          </div>
        );
}