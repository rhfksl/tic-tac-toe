import React from "react";
import shortid from "shortid";


interface Props{
  clickBoard(step: number): void;
  curBoard: (string|null)[];
  rowIdx: number;
}

class Square extends React.Component<Props> {
  // currentBoard, stepArr 받아서 해당 값 표시
  makeSquare(curBoard: (string|null)[], rowIdx: number) {
    return curBoard.map((val, idx) => {
      return (
        <button key={shortid.generate()} className="square" onClick={this.props.clickBoard.bind(this, idx + rowIdx * curBoard.length)}>
          {val}
        </button>
      );
    });
  }

  render() {
    return <div className="board-row">{this.makeSquare(this.props.curBoard, this.props.rowIdx)}</div>;
  }
}

export default Square;
