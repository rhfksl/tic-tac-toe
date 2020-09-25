type Board = (string | null)[][];

interface Traverse{
  (board: Board, row: number, col: number, otherUser: string): null | string;
}

// isWinner는 가로 세로 대각선 비교할 때 상대방 유저가 존재하지 않아야 하기 때문에 otherUser
export function checkIsWinner (board: Board, row: number, col: number, otherUser: string): null | string{
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

// 이 함수는 그 다음 차례 유저가 이길 수 있는 경우를 계산하기 때문에
// 가로 세로 대각선 비교할 때 현재 player가 없어야 함
export function isThisWinnerSpot(board: Board, row: number, col: number, curUser: string): boolean{
  if(traverseRow(board, row, col, curUser) || traverseCol(board, row, col, curUser) || traverseClockwiseDiagonal(board, row, col, curUser) || traverseCounterclockwiseDiagonal(board, row, col, curUser)){
    return true;
  } return false;

  function traverseRow(board: Board, row: number, col: number, curUser: string): boolean{
    if(board[row].includes(curUser)){
      return false;
    } 
    return true;
  }
  function traverseCol(board: Board, row: number, col: number, curUser: string): boolean{
    for(let i = 0; i < board.length; i++){
      if(board[i][col] === curUser){
        return false;
      }
    }
    return true;
  }
  function traverseClockwiseDiagonal(board: Board, row: number, col: number, curUser: string): boolean{
    if(row === col){
      for(let i = 0; i < board.length; i++){
        if(board[i][i] === curUser){
          return false;
        }
      }
      return true;
    }
    return false;
  }
  function traverseCounterclockwiseDiagonal(board: Board, row: number, col: number, curUser: string): boolean{
    if(row === col){
      for(let i = 0; i < board.length; i++){
        if(board[i][board.length - 1 - i] === curUser){
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
