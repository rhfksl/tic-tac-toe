import React from "react";
import shortid from "shortid";
import { SquareProps } from './Interface/Interface';

class Square extends React.Component<SquareProps> {
  // currentBoard, stepArr 받아서 해당 값 표시
  makeSquare(row: (string|null)[], rowIdx: number): JSX.Element[] {
    return row.map((val: null | string, idx: number) => {
      return (
        <button key={shortid.generate()} className="square" onClick={this.props.clickBoard.bind(this, idx + rowIdx * row.length)}>
          {val}
        </button>
      );
    });
  }

  render(): JSX.Element {
    return <div className="board-row">{this.makeSquare(this.props.row, this.props.rowIdx)}</div>;
  }
}

export default Square;

