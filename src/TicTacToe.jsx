import React from "react";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";
import "./TicTacToe.css";
var _ = require("lodash");

console.log("this is Board", Board);

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

    return (
      <div id="game-main">
        <Board curBoard={curBoard} clickBoard={(i) => this.clickBoard(i)} />
        <div className="info">
          {isWinner ? `winner is ${isWinner}` : "Tic-Tac-Toe"}
          <HistoryButtons histories={this.state.histories} jumpHistory={(step) => this.jumpHistory(step)} />
        </div>
      </div>
    );
  }
}

export default TicTacToe;
