import React, { useRef, useContext } from "react";
import { Board } from "./Board";
import { HistoryButtons } from "./HistoryButtons";
import "./TicTacToe.css";
import { TicTacToeContext } from './Context/TicTacToeStore';
import { STRING_O, STRING_X, STRING_POUND_BUTTON, SET_TICTACTOE_STATES } from './Constans/Constans'

export const TicTacToe: React.FunctionComponent<{}> = () => {

  const { histories, isNextX, step, winner, dispatch } = useContext(TicTacToeContext); 
  // variable for controlling setinterval
  const latestPlayHistories: React.MutableRefObject<boolean> = useRef<boolean>(true);
  const textInput = useRef<HTMLInputElement>(null);


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

  return (
      <div id="game-main">
        <div>
          <input id="create-board" type="text" ref={textInput} />
          <button onClick={createBoard}>button 생성</button>
          <div>step: {step}</div>
          <div>user: {isNextX ? STRING_X : STRING_O}</div>
          <div>winner: {winner}</div>
        </div>
        <Board />
        <div className="info">
          Tic-Tac-Toe
          <HistoryButtons />
        </div>
        <button onClick={showHistories}>Play</button>
        <button onClick={stopHistories}>Stop</button>
      </div>
  );
}

