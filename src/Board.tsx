import React from "react";
import Square from "./Square";
import shortid from "shortid";

interface Props{
  clickBoard(step: number): void;
  curBoard: (string|null)[][];
}

class Board extends React.Component<Props> {
  render() {
    return (
      <div className="board">
        {this.props.curBoard.map((row, rowIdx) => {
          return <Square key={shortid.generate()} curBoard={row} rowIdx={rowIdx} clickBoard={this.props.clickBoard} />;
        })}
      </div>
    );
  }
}

export default Board;
