type Board = (string | null)[][];

interface Traverse{
  (board: Board, len: number): null | string;
}

function isWinner (board: Board): null | string{
  // traverse row
    const traverseRow: Traverse = function (board, len) {
    for (let row = 0; row < len; row++) {
      let col = 0;
      while (board[row][0]) {
        if (board[row][0] === board[row][col]) {
          if (col === len - 1) {
            return board[row][col];
          } else {
            col++;
          }
        } else {
          break;
        }
      }
    }
    return null;
  }
  // check col values
  const traverseCol: Traverse = function(board, len) {
    for (let col = 0; col < len; col++) {
      let row = 0;
      while (board[0][col]) {
        if (board[0][col] === board[row][col]) {
          if (row === len - 1) {
            return board[row][col];
          } else {
            row++;
          }
        } else {
          break;
        }
      }
    }
    return null;
  }
  const traverseClockwiseDiagonal: Traverse = function (board, len) {
    let row = 0;
    let col = 0;

    while (board[0][0]) {
      if (board[0][0] === board[row][col]) {
        if (row === len - 1) {
          return board[row][col];
        } else {
          row++;
          col++;
        }
      } else {
        break;
      }
    }
    return null;
  }
  const traverseCounterclockwiseDiagonal: Traverse = function(board, len) {
    let row = 0;
    let col = len - 1;

    // check firstVal in while loop
    while (board[0][len - 1]) {
      if (board[0][len - 1] === board[row][col]) {
        if (row === len - 1) {
          return board[row][col];
        } else {
          row++;
          col--;
        }
      } else {
        break;
      }
    }
    return null;
  }

  let helpers: Traverse[] = [traverseRow, traverseCol, traverseClockwiseDiagonal, traverseCounterclockwiseDiagonal];
  for (let i = 0; i < helpers.length; i++) {
    let winner: string | null = helpers[i](board, board.length);
    if (winner === 'O' || winner === 'X') {
    console.log('asdf this is winner', winner);

      return winner;
    }
  }
  return null;
}

export default isWinner;
