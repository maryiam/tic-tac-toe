import Square from './Square';
import React from 'react';
import {isSquareInWinnerRow} from './helpers';

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} highlighted={this.isHighlighted(i)} setSquareValue={this.props.onPlayTurn.bind(null, i)} className="highlight" />;
  }

  isHighlighted(index) {
    return isSquareInWinnerRow(this.props.winnerRow, index) != undefined;
  }

  loadView() {
    let blocks = [];
    for (let j = 0; j < this.props.squares.length; j += 3) {
      let block =
        <div className="board-row" key={j}>
          {this.loadSquares(j)}
        </div>;
      blocks.push(block)
    }

    return blocks;
  }

  loadSquares(j) {
    let squares = [];
    for (let i = j; i < j + 3; i++) {
      squares.push(this.renderSquare(i));
    }

    return squares;
  }

  render() {
    return (
      <div>
        {this.loadView()}
      </div>
    )
  }
}

export default Board;
