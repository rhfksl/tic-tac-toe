import React from "react";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";
import isWinner from "./functions";
import "./TicTacToe.css";
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

  clickBoard(number) {
    const cloneHistories = _.cloneDeep(this.state.histories);
    const curBoard = _.clone(cloneHistories[this.state.step]);

    if (curBoard[number]) {
      console.log("you already clicked this square");
      return;
    }

    if (isWinner(curBoard)) {
      console.log("winner exists");
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
    const winner = isWinner(curBoard);

    return (
      <div id="game-main">
        <Board curBoard={curBoard} clickBoard={(i) => this.clickBoard(i)} />
        <div className="info">
          {winner ? `winner is ${winner}` : "Tic-Tac-Toe"}
          <HistoryButtons histories={this.state.histories} jumpHistory={(step) => this.jumpHistory(step)} />
        </div>
      </div>
    );
  }
}

export default TicTacToe;
