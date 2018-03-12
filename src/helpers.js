export function getWinnerInfo(squares) {
  const wonPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < wonPossibilities.length; i++) {
    let [a, b, c] = wonPossibilities[i];
    if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        name: squares[a],
        row: wonPossibilities[i]
      };
    }
  };

  return null;
}

export function isBoardFull(array) {
  return removeNullItems(array).length === array.length;
}

export function getXPosition(position) {
  return position % 3 + 1;
}

export function getYPosition(position) {
  return Math.floor(position / 3) + 1;
}

export function isSquareInWinnerRow(row, index) {
  return row.find(val => val === index)  !== undefined;
}

function removeNullItems(array) {
  return array.filter(elem => elem !== null);
}
