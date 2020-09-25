import React, { useState, useEffect } from "react";
import { RowSquare } from "./Square";
import shortid from "shortid";
import _ from "lodash";

const STRING_O: string = 'O';
const STRING_X: string = 'X';

type Board = (string | null)[][];
interface Traverse{
  (board: Board, row: number, col: number, otherUser: string): null | string;
}

function checkIsWinner (board: Board, row: number, col: number, otherUser: string): null | string{
  // traverse row
    const traverseRow = function (board: Board, row: number, col: number, otherUser: string): null | string {
      for(let i = 0; i < board.length; i++){
        if(!board[row][i] || board[row][i] === '#' || board[row][i] === otherUser){
          return null;
        }
      }
    return otherUser === 'X' ? 'O' : 'X';
  }
  // check col
  const traverseCol = function(board: Board, row: number, col: number, otherUser: string): null | string {
    for(let i = 0 ; i< board.length; i++){
      if(!board[i][col] || board[i][col]=== '#' || board[i][col] === otherUser){
        return null;
      }
    }
    return otherUser === 'X' ? 'O' : 'X';
  }
  
  const traverseClockwiseDiagonal = function (board: Board, row: number, col: number, otherUser: string): null | string {
    
    if(row === col){
      for(let i = 0; i < board.length; i++){
        const boardVal: null | string = board[i][i];
        if(!boardVal || boardVal === otherUser || boardVal === '#'){
          return null;
        }
      }
      return otherUser === 'X' ? 'O' : 'X';
    }
    return null;
  }
  const traverseCounterclockwiseDiagonal = function(board: Board, row: number, col: number, otherUser: string): null | string {
    if(row === board.length - 1 - col){
      for(let i = 0; i < board.length; i++){
        const boardVal: null | string = board[i][board.length - 1 - i];
        if(!boardVal || boardVal === otherUser || boardVal === '#'){
          return null;
        }
      }
      return otherUser === 'X' ? 'O' : 'X';
    }
    return null;
  }

  let helpers: Traverse[] = [traverseRow, traverseCol, traverseClockwiseDiagonal, traverseCounterclockwiseDiagonal];
  
  for (let i = 0; i < helpers.length; i++) {
    let winner: string | null = helpers[i](board, row, col, otherUser);
    if (winner === 'O' || winner === 'X') {
      return winner;
    }
  }
  return null;
}

export interface BoardProps{
    backgroundColor: string;
    boardLength: number;
}

interface BoardStates {
  histories: (null | string)[][][];
  step: number;
  isNextX: boolean;
  winner: (null | string);
}

export const Board: React.FunctionComponent<BoardProps> = props => {
  const { backgroundColor, boardLength } = props;
  const initialBoard: null[][] = [];
  
  for(let i = 0; i < boardLength; i++) initialBoard.push(Array(boardLength).fill(null));

  const [ boardStates, setBoardStates ] = useState<BoardStates>(
    { histories: [ initialBoard ],
      step: 0,
      isNextX: true,
      winner: null,
    }
  );


  useEffect(()=>{
    setBoardStates({...boardStates, histories: [ initialBoard ]})
  }, [boardLength])
  
  const { histories, step, isNextX, winner } = boardStates;
  const curBoard: Board = histories[step];
  
  function clickBoard(boardIdx: number): void{

    if(winner){
      console.log('already winner exists');
      return;
    }
    const cloneHistories: (string|null)[][][] = _.cloneDeep(histories);
    const curBoard: Board = _.cloneDeep(histories[step]);
    const leng: number = curBoard.length;
    const row: number = parseInt(String(boardIdx / leng));
    const col: number = boardIdx % leng;

    if (curBoard[row][col] === STRING_O || curBoard[row][col] === STRING_X) {
      console.log("you already clicked this square");
      return;
    }

    curBoard[row][col] = isNextX ? STRING_X : STRING_O;

    const otherUser: string = isNextX ? STRING_O : STRING_X;
    const isWinner: string | null = checkIsWinner(curBoard, row, col, otherUser);

    setBoardStates({ ...boardStates, histories: [ ...cloneHistories, curBoard ], isNextX: !isNextX, step: step + 1, winner: isWinner } );
  }
    
  return (
          <div className="board">
            <div>current Turn: { isNextX ? STRING_X : STRING_O }</div>
            <div>winner: {winner}</div>
            {curBoard.map((row: (null | string)[], rowIdx: number) => {
              return <RowSquare key={shortid.generate()} row={row} rowIdx={rowIdx} backgroundColor={backgroundColor} clickBoard={clickBoard} />
            })}
          </div>
        );
}

