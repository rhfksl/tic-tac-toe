type Board = (string | null)[][];

interface Traverse{
  (board: Board, row: number, col: number, otherUser: string): null | string;
}

export function isWinner (board: Board, row: number, col: number, otherUser: string): null | string{
  // traverse row
    const traverseRow = function (board: Board, row: number, col: number, otherUser: string): null | string {
      for(let i = 0; i < board.length; i++){
        if(!board[row][i] || board[row][i]=== '#' || board[row][i] === otherUser){
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

export function isThisWinnerSpot(board: Board, row: number, col: number, otherUser: string){
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