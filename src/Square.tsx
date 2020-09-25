import React, { useContext } from "react";
import shortid from "shortid";
import { SquareProps } from './Interface/Interface';
import { isThisWinnerSpot, checkIsWinner } from './functions';
import { TicTacToeContext } from './Context/TicTacToeStore';
import { STRING_POUND_BUTTON, STRING_X, STRING_O, SET_TICTACTOE_STATES } from './Constans/Constans';
import { CurBoard, Histories } from './Interface/Interface';
import _ from "lodash";

export const RowSquare: React.FunctionComponent<SquareProps> = props => {
  const { row, rowIdx } = props;
  const { histories, isNextX, step, winner, dispatch } = useContext(TicTacToeContext)

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
  
  const makeSquare = (row: (string|null)[], rowIdx: number): JSX.Element[] => {
    return row.map((val: null | string, idx: number) => {
      return (
        <button key={shortid.generate()} className="square" onClick={()=>{clickBoard(idx + rowIdx * row.length)}}>
          {val}
        </button>
      );
    });
  }
  
  return <div className="board-row">{makeSquare(row, rowIdx)}</div>;
}

