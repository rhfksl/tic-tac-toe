import React from "react";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";
import isWinner from "./functions";
import "./TicTacToe.css";
import _ from "lodash";

type Histories = (null | string)[][][];
interface State{
  histories:Histories;
  isNextX: boolean;
  step: number;
  playHistories: boolean;
}


class TicTacToe extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      histories: [[Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)]],
      isNextX: true,
      step: 0,
      playHistories: true,
    };
  }

  clickBoard (number: number) {
    const cloneHistories: Histories = _.cloneDeep(this.state.histories).slice(0, this.state.step + 1);
    const curBoard: (null | string)[][] = _.cloneDeep(cloneHistories[this.state.step]);
    const leng: number = curBoard.length;
    const row: number = parseInt(String(number / leng));
    const col: number = number % leng;

    if (curBoard[row][col]) {
      console.log("you already clicked this square");
      return;
    }

    if (isWinner(curBoard)) {
      console.log("winner exists");
      return;
    }

    curBoard[row][col] = this.state.isNextX ? "X" : "O";

    this.setState({
      histories: [...cloneHistories, curBoard],
      isNextX: !this.state.isNextX,
      step: this.state.step + 1,
    });
  }

  jumpHistory(step: number) {
    // use if you want history delete immediately when you click jump
    // const cloneHistories = _.cloneDeep(this.state.histories);
    // cloneHistories.splice(step + 1);

    this.setState({
      // histories: cloneHistories,
      step: step,
      isNextX: step % 2 === 0,
    });
  }

  showHistories() {
    this.setState({ playHistories: true }, () => {
      const histories: Histories = this.state.histories;

      let count: number = this.state.step;
      const end: number = histories.length - 1;
      if(count === end){
        count = 0;
      }

      const showHistories: NodeJS.Timeout = setInterval(() => {
        if (count <= end && this.state.playHistories) {
          this.jumpHistory(count);
          count++;
        } else {
          clearInterval(showHistories);
        }
      }, 300);
    });
  }

  stopHistories() {
    this.setState({ playHistories: false });
  }

  createBoard() {
    const inputValue = Number((document.getElementById("create-board") as HTMLInputElement).value);
    let leng: number;
    if (isNaN(inputValue) || inputValue === 0) {
      leng = 3;
    }else{
      leng = inputValue;
    }
    const newBoard:null[][] = [];
    for (let i = 0; i < leng; i++) {
      newBoard.push(Array(leng).fill(null));
    }
    this.setState({ histories: [newBoard], step: 0, isNextX: true });
  }

  render() {
    const curBoard: (null | string)[][] = this.state.histories[this.state.step];
    const winner: null | string = isWinner(curBoard);

    return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text"></input>
          <input type="submit" value="board 생성" onClick={this.createBoard.bind(this)} />
        </div>
        <Board curBoard={curBoard} clickBoard={this.clickBoard.bind(this)} />
        <div className="info">
          {winner ? `winner is ${winner}` : "Tic-Tac-Toe"}
          <HistoryButtons histories={this.state.histories} jumpHistory={(step) => this.jumpHistory(step)} />
        </div>
        <button onClick={this.showHistories.bind(this, "play")}>Play</button>
        <button onClick={this.stopHistories.bind(this, "stop")}>Stop</button>
      </div>
    );
  }
}

export default TicTacToe;
