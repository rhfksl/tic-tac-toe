import React from "react";
import shortid from "shortid";
import { SquareProps } from './Interface/Interface';


export const Square: React.FunctionComponent<SquareProps> = props => {
  const { row, rowIdx, clickBoard } = props;
  
  const makeSquare = (row: (string|null)[], rowIdx: number): JSX.Element[] => {
    return row.map((val: null | string, idx: number) => {
      return (
        <button key={shortid.generate()} className="square" onClick={()=>{clickBoard(idx + rowIdx * row.length)}}>
          {val}
        </button>
      );
    });
  }
  
  return <div className="board-row">{makeSquare(row, rowIdx)}</div>;
}

