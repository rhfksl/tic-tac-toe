import React from "react";

class Board extends React.Component {
  // currentBoard, stepArr 받아서 해당 값 표시
  makeSquare(curBoard, stepArr) {
    return stepArr.map((val) => {
      return (
        <button key={val} className="square" onClick={() => this.props.clickBoard(val)}>
          {curBoard[val]}
        </button>
      );
    });
  }
  render() {
    return (
      <div className="board">
        <div className="board-row">{this.makeSquare(this.props.curBoard, [0, 1, 2])}</div>
        <div className="board-row">{this.makeSquare(this.props.curBoard, [3, 4, 5])}</div>
        <div className="board-row">{this.makeSquare(this.props.curBoard, [6, 7, 8])}</div>
      </div>
    );
  }
}

export default Board;
