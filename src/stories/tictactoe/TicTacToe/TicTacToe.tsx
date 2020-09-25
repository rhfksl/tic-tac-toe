import React, { useState, useRef } from "react";
import { Board } from "./Board";
import { HistoryButtons } from "./HistoryButtons";
import { checkIsWinner, isThisWinnerSpot } from "./functions";
import "./TicTacToe.css";
import _ from "lodash";

type Histories = (null | string)[][][];
type CurBoard = (string|null)[][];
export interface TicTacToeStatesType{
    histories:Histories;
    isNextX: boolean;
    step: number;
    winner: null | string;
}

export const TicTacToe: React.FunctionComponent<{}> = () => {

  const [ TicTacToeStates, setStates ] = useState<TicTacToeStatesType>(
    { histories: [ [Array(3).fill('#'), Array(3).fill('#'), Array(3).fill('#')] ],
      isNextX: true,
      step: 0,
      winner: null }
  );
  const { histories, isNextX, step, winner } = TicTacToeStates;
  const STRING_X = 'X';
  const STRING_O = 'O';
  const STRING_POUND_BUTTON = '#';
  const curBoard: CurBoard = histories[step];


  // variable for controlling setinterval
  const latestPlayHistories: React.MutableRefObject<boolean> = useRef<boolean>(true);
  const textInput = useRef<HTMLInputElement>(null);

  function calculateWinnerPosition (board: CurBoard, otherUser: string): void{
    for(let row = 0; row < board.length; row++){
      for(let col = 0; col < board.length; col++){
        if(!board[row][col] || board[row][col] === STRING_POUND_BUTTON){
          if(isThisWinnerSpot(board, row, col, otherUser)){
            board[row][col] = STRING_POUND_BUTTON;
          }else{
            board[row][col] = null;
          }
        }
      }
    }

    setStates({ ...TicTacToeStates, histories: [...histories, board], isNextX: !isNextX, step: step + 1});
  };

  function clickBoard (boardIdx: number): void {
    
    if(winner){
      console.log('already winner exists');
      return;
    }

    const cloneHistories: Histories = _.cloneDeep(histories).slice(0, step + 1);
    const curBoard: CurBoard = _.cloneDeep(cloneHistories[step]);
    const leng: number = curBoard.length;
    const row: number = parseInt(String(boardIdx / leng));
    const col: number = boardIdx % leng;
    const curUser: string = isNextX ? STRING_X : STRING_O;
    const otherUser: string = isNextX ? STRING_O : STRING_X;
    const isWinner: string | null = checkIsWinner(curBoard, row, col, otherUser);

    if (curBoard[row][col] === STRING_O || curBoard[row][col] === STRING_X ) {
      console.log("you already clicked this square");
      return;
    }

    curBoard[row][col] = isNextX ? STRING_X : STRING_O;

    if (isWinner) {
      setStates({ ...TicTacToeStates, histories: [...cloneHistories, curBoard], winner: isWinner, step: step + 1});
      return;
    }
    // guess # position
    calculateWinnerPosition(curBoard, curUser);
  }

  function jumpHistory(newStep: number): void {
    setStates({ ...TicTacToeStates, isNextX: newStep % 2 === 0, step: newStep});
  }

  function showHistories(): void {
    latestPlayHistories.current = true;

    let count: number = step;
    const end: number = histories.length - 1;

    if(count === end){
      count = 0;
    }
    const showHistories: NodeJS.Timeout = setInterval(() => {
      if (count <= end && latestPlayHistories.current) {
        jumpHistory(count);
        count++;
      } else {
        clearInterval(showHistories);
      }
    }, 500);
  }

  function stopHistories(): void {
    latestPlayHistories.current = false;
  }

  function createBoard(): void {
    const inputValue: number = Number(textInput.current?.value);
    let leng: number;
    const newBoard: string[][] = [];

    if(!inputValue || isNaN(inputValue)){
      alert('알맞은 숫자를 입력해 주십시오');
      return;
    }
    leng = inputValue;
    
    for (let i = 0; i < leng; i++) {
      newBoard.push(Array(leng).fill(STRING_POUND_BUTTON));
    }
    setStates({ histories: [newBoard], winner: null, step: 0, isNextX: true });
  }

  return (
    <div id="game-main">
      <div>
        <input id="create-board" type="text" ref={textInput} />
        <button onClick={createBoard}>board 생성</button>
        <div>step: {step}</div>
        <div>user: {isNextX ? STRING_X : STRING_O}</div>
        <div>winner: {winner}</div>
      </div>
      <Board curBoard={curBoard} clickBoard={clickBoard} />
      <div className="info">
        Tic-Tac-Toe
        <HistoryButtons histories={histories} jumpHistory={jumpHistory} />
      </div>
      <button onClick={showHistories}>Play</button>
      <button onClick={stopHistories}>Stop</button>
    </div>
  );
}