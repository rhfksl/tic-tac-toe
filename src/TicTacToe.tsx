import React from "react";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";
import { isWinner, isThisWinnerSpot } from "./functions";
import { TicTacToeStates, CurBoard, Histories } from './Interface/Interface';
import "./TicTacToe.css";
import _ from "lodash";


class TicTacToe extends React.Component<{}, TicTacToeStates> {
  private textInput: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);
    this.state = {
      histories: [ [Array(3).fill('#'), Array(3).fill('#'), Array(3).fill('#')] ],
      isNextX: true,
      step: 0,
      playHistories: true,
      winner: null,
    };
    this.textInput = React.createRef();
  }

  calculateWinnerPosition(board: CurBoard, otherUser: string): void{
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.length; j++){
        if(!board[i][j] || board[i][j] === '#'){
          if(isThisWinnerSpot(board, i, j, otherUser)){
            board[i][j] = '#';
          }else{
            board[i][j] = null;
          }
        }
      }
    }

    this.setState({
      histories: [...this.state.histories, board],
      isNextX: !this.state.isNextX,
      step: this.state.step + 1,
    });
  }

  clickBoard (number: number): void {
    
    if(this.state.winner){
      console.log('already winner exists');
      return;
    }

    const cloneHistories: Histories = _.cloneDeep(this.state.histories).slice(0, this.state.step + 1);
    const curBoard: CurBoard = _.cloneDeep(cloneHistories[this.state.step]);
    const leng: number = curBoard.length;
    const row: number = parseInt(String(number / leng));
    const col: number = number % leng;
    

    if (curBoard[row][col] === 'O' || curBoard[row][col] === 'X') {
      console.log("you already clicked this square");
      return;
    }

    curBoard[row][col] = this.state.isNextX ? "X" : "O";

    const curUser: string = this.state.isNextX ? "X" : 'O';
    const otherUser: string = this.state.isNextX ? "O" : "X";
    const winner: string | null = isWinner(curBoard, row, col, otherUser);

    if (winner) {
      this.setState({histories: [...cloneHistories, curBoard], winner: winner, step: this.state.step + 1,});
      return;
    }
    // guess # position
    this.calculateWinnerPosition(curBoard, curUser);
  }

  jumpHistory(step: number): void {
    this.setState({
      step: step,
      isNextX: step % 2 === 0,
    });
  }

  showHistories(): void {
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

  stopHistories(): void {
    this.setState({ playHistories: false });
  }

  createBoard(): void {
    const inputValue: number | undefined = Number(this.textInput.current?.value);
    let leng: number;

    if(!inputValue || isNaN(inputValue)){
      alert('알맞은 숫자를 입력해 주십시오');
      return;
    }else{
      leng = inputValue;
    }

    const newBoard: string[][] = [];
    for (let i = 0; i < leng; i++) {
      newBoard.push(Array(leng).fill('#'));
    }
    this.setState({ histories: [newBoard], step: 0, isNextX: true });
  }

  

  render(): JSX.Element {
    const curBoard: CurBoard = this.state.histories[this.state.step];
    const winner: null | string = this.state.winner;

    return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text" ref={this.textInput} />
          <input type="submit" value="board 생성" onClick={this.createBoard.bind(this)} />
        </div>
        <Board curBoard={curBoard} clickBoard={this.clickBoard.bind(this)} />
        <div className="info">
          {winner ? `winner is ${winner}` : "Tic-Tac-Toe"}
          <HistoryButtons histories={this.state.histories} jumpHistory={this.jumpHistory.bind(this)} />
        </div>
        <button onClick={this.showHistories.bind(this)}>Play</button>
        <button onClick={this.stopHistories.bind(this)}>Stop</button>
      </div>
    );
  }
}

export default TicTacToe;
