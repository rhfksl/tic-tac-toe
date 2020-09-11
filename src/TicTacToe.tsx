import React from "react";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";
import isWinner from "./functions";
import { TicTacToeStates, CurBoard, Histories } from './Interface/Interface';
import "./TicTacToe.css";
import _ from "lodash";

function isThisWinnerSpot(board: CurBoard, row: number, col: number, otherUser: string){
  if(traverseRow(board, row, otherUser) || traverseCol(board, col, otherUser) || traverseClockwiseDiagonal(board, row, col, otherUser) || traverseCounterclockwiseDiagonal(board, row, col, otherUser)){
    return true;
  } return false;
}

function traverseRow(board: any, row: any, otherUser: any): boolean{
  if(board[row].includes(otherUser)){
    return false;
  } 
  return true;
}
function traverseCol(board: any, col: any, otherUser: any): boolean{
  for(let i = 0; i < board.length; i++){
    if(board[i][col] === otherUser){
      return false;
    }
  }
  return true;
}
function traverseClockwiseDiagonal(board: any, row: any, col: any, otherUser: any): boolean{
  if(row === col){
    for(let i = 0; i < board.length; i++){
      if(board[i][i] === otherUser){
        return false;
      }
    }
    return true;
  }
  return false;
}
function traverseCounterclockwiseDiagonal(board: any, row: any, col: any, otherUser: any): boolean{
  if(row === col){
    for(let i = 0; i < board.length; i++){
      if(board[i][board.length - 1 - i] === otherUser){
        return false;
      }
    }
    return true;
  }
  return false;
}

class TicTacToe extends React.Component<{}, TicTacToeStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      histories: [ [Array(3).fill('#'), Array(3).fill('#'), Array(3).fill('#')] ],
      winnerBoard: [Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)] ,
      isNextX: true,
      step: 0,
      playHistories: true,
    };
  }

  calculateWinnerPosition(board: any, otherUser: any): any{
    board = _.cloneDeep(board);
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
    // console.log('this is other board', board);
  }

  clickBoard (number: number): void {
    const cloneHistories: Histories = _.cloneDeep(this.state.histories).slice(0, this.state.step + 1);
    const curBoard: CurBoard = _.cloneDeep(cloneHistories[this.state.step]);
    const leng: number = curBoard.length;
    const row: number = parseInt(String(number / leng));
    const col: number = number % leng;

    if (curBoard[row][col] === 'O' || curBoard[row][col] === 'X') {
      console.log("you already clicked this square");
      return;
    }

    if (isWinner(curBoard)) {
      console.log("winner exists");
      return;
    }

    curBoard[row][col] = this.state.isNextX ? "X" : "O";

    const otherUser: string = this.state.isNextX ? "X" : "O";
    this.calculateWinnerPosition(curBoard, otherUser);
    

    // this.setState({
    //   histories: [...cloneHistories, curBoard],
    //   isNextX: !this.state.isNextX,
    //   step: this.state.step + 1,
    // });
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

  createBoard(e: any): void {

    // ref를 쓰거나

    const inputValue: number = Number((document.getElementById("create-board") as HTMLInputElement).value);
    

    let leng: number;
    if (isNaN(inputValue) || inputValue === 0) {
      leng = 3;
    }else{
      leng = inputValue;
    }
    const newBoard: null[][] = [];
    for (let i = 0; i < leng; i++) {
      newBoard.push(Array(leng).fill(null));
    }
    this.setState({ histories: [newBoard], step: 0, isNextX: true });

// length가 1이면 아무것도 없고
// length가 2 이상인데, step === length라면 < 버튼 생성
// length가 2 이상인데, step === 0이라면 > 버튼 생성
// length가 2 이상이라면  <> 버튼 생성

  }

  

  render(): JSX.Element {
    const curBoard: CurBoard = this.state.histories[this.state.step];
    const winner: null | string = isWinner(curBoard);

    return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text" />
          <input type="submit" value="board 생성" onClick={this.createBoard.bind(this)} />
        </div>
        <Board curBoard={curBoard} clickBoard={this.clickBoard.bind(this)} />
        {/* <Board curBoard={this.state.winnerBoard} clickBoard={this.clickBoard.bind(this)} /> */}
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
