import React from "react";
import Square from "./Square";
import shortid from "shortid";
import { BoardProps } from './Interface/Interface';

class Board extends React.Component<BoardProps> {
  render(): JSX.Element {
    return (
      <div className="board">
        {this.props.curBoard.map((row, rowIdx) => {
          return <Square key={shortid.generate()} row={row} rowIdx={rowIdx} clickBoard={this.props.clickBoard} />;
        })}
      </div>
    );
  }
}

export default Board;
