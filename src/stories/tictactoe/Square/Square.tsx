import React from "react";
import shortid from "shortid";
import './Square.css';

export interface SquareProps{
    clickBoard(step: number): void;
    row: (string|null)[];
    backgroundColor: string;
    buttonColor: string;
    rowIdx: number;
    size: string;
}

export const RowSquare: React.FunctionComponent<SquareProps> = props => {
  const { row, rowIdx, backgroundColor, buttonColor, size, clickBoard } = props;

  const makeSquare = (row: (string|null)[], rowIdx: number): JSX.Element[] => {
    return row.map((val: null | string, idx: number) => {
      return (
        <button 
            key={shortid.generate()} 
            className="square-button"
            style={{ backgroundColor: buttonColor, width: size, height: size }}
            onClick={()=>{clickBoard(idx + rowIdx * row.length)}}>
          {val}
        </button>
      );
    });
  }
  
  return <div className="board-row" style={{ backgroundColor }}>{makeSquare(row, rowIdx)}</div>;
}

