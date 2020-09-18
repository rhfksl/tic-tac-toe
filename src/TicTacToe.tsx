import React, { useRef, useContext } from "react";
import { Board } from "./Board";
import { HistoryButtons } from "./HistoryButtons";
import { checkIsWinner, isThisWinnerSpot } from "./functions";
import { CurBoard, Histories } from './Interface/Interface';
import "./TicTacToe.css";
import _ from "lodash";
import { TicTacToeContext } from './Context/TicTacToeStore';

export const TicTacToe: React.FunctionComponent<{}> = () => {

  const { histories, isNextX, step, winner, dispatch }: any = useContext(TicTacToeContext); 

  function calculateWinnerPosition (board: CurBoard, otherUser: string): void{
    for(let row = 0; row < board.length; row++){
      for(let col = 0; col < board.length; col++){
        if(!board[row][col] || board[row][col] === '#'){
          if(isThisWinnerSpot(board, row, col, otherUser)){
            board[row][col] = '#';
          }else{
            board[row][col] = null;
          }
        }
      }
    }

    dispatch({ type: 'SET_HISTORIES', payload: [...histories, board] });
    dispatch({ type: 'SET_ISNEXTX', payload: !isNextX });
    dispatch({ type: 'SET_STEP', payload: step + 1 });
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
    

    if (curBoard[row][col] === 'O' || curBoard[row][col] === 'X') {
      console.log("you already clicked this square");
      return;
    }

    curBoard[row][col] = isNextX ? "X" : "O";

    const curUser: string = isNextX ? "X" : 'O';
    const otherUser: string = isNextX ? "O" : "X";
    const isWinner: string | null = checkIsWinner(curBoard, row, col, otherUser);

    if (isWinner) {
      dispatch({ type: 'SET_HISTORIES', payload: [ ...cloneHistories, curBoard ] });
      dispatch({ type: 'SET_WINNER', payload: isWinner });
      dispatch({ type: 'SET_STEP', payload: step + 1});
      return;
    }
    // guess # position
    calculateWinnerPosition(curBoard, curUser);
  }

  function jumpHistory(newStep: number): void {
    dispatch({ type: 'SET_STEP', payload: newStep });
    dispatch({ type: 'SET_ISNEXTX', payload: newStep % 2 === 0 });
  }

  // variable for controlling setinterval
  const latestPlayHistories: React.MutableRefObject<boolean> = useRef<boolean>(true);

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

  const textInput = useRef<HTMLInputElement>(null);
  function createBoard(): void {
    const inputValue: number = Number(textInput.current?.value);
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

    dispatch({ type: 'SET_HISTORIES', payload: [ newBoard ] });
    dispatch({ type: 'SET_WINNER', payload: null });
    dispatch({ type: 'SET_ISNEXTX', payload: true });
    dispatch({ type: 'SET_STEP', payload: 0 }); 
  }

const curBoard: CurBoard = histories[step];

  return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text" ref={textInput} />
          <input type="submit" value="board 생성" onClick={createBoard} />
          <div>step: {step}</div>
          <div>user: {isNextX ? 'X' : 'O'}</div>
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

