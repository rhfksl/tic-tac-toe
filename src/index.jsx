import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
var _ = require("lodash");

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [Array(9).fill(null)],
      isNextX: true,
      step: 0,
    };
  }

  isWinner(board) {
    const winCase = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winCase.length; i++) {
      const [a, b, c] = winCase[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  clickBoard(number) {
    const cloneHistories = _.cloneDeep(this.state.histories);
    const curBoard = _.clone(cloneHistories[this.state.step]);

    if (this.isWinner(curBoard)) {
      console.log("winner exists");
      return;
    }
    if (curBoard[number]) {
      console.log("you already clicked this square");
      return;
    }

    curBoard[number] = this.state.isNextX ? "X" : "O";

    this.setState({
      histories: [...cloneHistories, curBoard],
      isNextX: !this.state.isNextX,
      step: this.state.step + 1,
    });
  }

  // currentBoard, stepArr 받아서 해당 값 표시
  makeSquare(curBoard, stepArr) {
    return stepArr.map((val) => {
      return (
        <button key={val} className="square" onClick={() => this.clickBoard(val)}>
          {curBoard[val]}
        </button>
      );
    });
  }

  jumpHistory(step) {
    const cloneHistories = _.cloneDeep(this.state.histories);
    cloneHistories.splice(step + 1);

    // 해당 history로 jump
    this.setState({
      histories: cloneHistories,
      step: step,
      isNextX: step % 2 === 0,
    });
  }

  render() {
    const curBoard = this.state.histories[this.state.step];
    const isWinner = this.isWinner(curBoard);
    const historyButtons = this.state.histories.map((_, step) => {
      return (
        <button key={step} onClick={() => this.jumpHistory(step)}>
          {step === 0 ? "game start" : `go to ${step} step`}
        </button>
      );
    });

    return (
      <>
        <div id="game-main">
          <div className="board">
            <div className="board-row">{this.makeSquare(curBoard, [0, 1, 2])}</div>
            <div className="board-row">{this.makeSquare(curBoard, [3, 4, 5])}</div>
            <div className="board-row">{this.makeSquare(curBoard, [6, 7, 8])}</div>
          </div>
          <div className="info">
            {isWinner ? `winner is ${isWinner}` : "Tic-Tac-Toe"}
            <div className="history">
              Jump to history
              <div className="history-button-box">{historyButtons}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<TicTacToe />, document.getElementById("root"));
