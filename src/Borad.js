import Square from './Square';
import React from 'react';
import { isSquareInWinnerRow } from './helpers';

class Board extends React.Component {
  renderSquare(i) {
    const winnerInfo = this.props.winnerInfo;
    let isHighlighted = false;

    if (winnerInfo) {
      isHighlighted = isSquareInWinnerRow(winnerInfo.row, i);
    }

    return <Square key={i} value={this.props.squares[i]} highlighted={isHighlighted} setSquareValue={this.props.onPlayTurn.bind(null, i)} />;
  }

  render() {
    const board = [];
    const squares = this.props.squares;

    for (let j = 0; j < squares.length; j += 3) {
      let items = new Array(3).fill(j);
      board.push(
        <div className="board-row" key={j}>
          {items.map((item, key) => this.renderSquare(j + key))}
        </div>
      );
    }

    return (
      <div className="game-board">
        <div>
          {board}
        </div>
      </div>
    )
  }
}

export default Board;
