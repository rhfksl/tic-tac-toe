import React, { useRef, useContext } from "react";
import { Board } from "./Board";
import { HistoryButtons } from "./HistoryButtons";
import { checkIsWinner, isThisWinnerSpot } from "./functions";
import { CurBoard, Histories, TicTacToeContextType } from './Interface/Interface';
import "./TicTacToe.css";
import _ from "lodash";
import { TicTacToeContext } from './Context/TicTacToeStore';
import { STRING_O, STRING_X, STRING_POUND_BUTTON, SET_TICTACTOE_STATES } from './Constans/Constans'

export const TicTacToe: React.FunctionComponent<{}> = () => {

  // why error we use set type to TicTacToeContextType
  const { histories, isNextX, step, winner, dispatch }: any = useContext(TicTacToeContext); 

  // variable for controlling setinterval
  const latestPlayHistories: React.MutableRefObject<boolean> = useRef<boolean>(true);
  const textInput = useRef<HTMLInputElement>(null);

  function calculateWinnerPosition (board: CurBoard, otherUser: string): CurBoard{
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
    return board;
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
    

    if (curBoard[row][col] === STRING_O || curBoard[row][col] === STRING_X) {
      console.log("you already clicked this square");
      return;
    }

    curBoard[row][col] = isNextX ? STRING_X : STRING_O;

    const curUser: string = isNextX ? STRING_X : STRING_O;
    const otherUser: string = isNextX ? STRING_O : STRING_X;
    const isWinner: string | null = checkIsWinner(curBoard, row, col, otherUser);

    if (isWinner) {
    dispatch({ type: SET_TICTACTOE_STATES, payload: { histories: [ ...cloneHistories, curBoard ], isNextX: !isNextX, step: step + 1, winner: isWinner } });
      return;
    }
    // guess # position
    const newBoard: CurBoard = calculateWinnerPosition(curBoard, curUser);
    dispatch({ type: SET_TICTACTOE_STATES, payload: { histories: [...cloneHistories, newBoard], isNextX: !isNextX, step: step + 1, winner: null } });

  }

  function jumpHistory(newStep: number): void {
    dispatch({ type: SET_TICTACTOE_STATES, payload: { histories: histories, isNextX: newStep % 2 === 0, step: newStep, winner: winner } });

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

    if(!inputValue || isNaN(inputValue)){
      alert('알맞은 숫자를 입력해 주십시오');
      return;
    }else{
      leng = inputValue;
    }

    const newBoard: string[][] = [];
    for (let i = 0; i < leng; i++) {
      newBoard.push(Array(leng).fill(STRING_POUND_BUTTON));
    }

    dispatch({ type: SET_TICTACTOE_STATES, payload: { histories: [ newBoard ], isNextX: true, step: 0, winner: null } });
  }

const curBoard: CurBoard = histories[step];

  return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text" ref={textInput} />
          <button onClick={createBoard}>button 생성</button>
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

