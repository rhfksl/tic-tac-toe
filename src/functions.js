// test 함수 모듈용
function isWinner(board) {
  const winCase = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCase.length; i++) {
    const [a, b, c] = winCase[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// module.exports = { isWinner: isWinner };
export default isWinner;
