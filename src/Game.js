import * as helpers from './helpers';
import React from 'react';
import Board from './Borad';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: new Array(9).fill(null),
        position: {}
      }],
      step: 0,
      player: 'X'
    }
  }

  handlePlayTurn(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const squares = history[history.length - 1].squares.slice();
    const current = this.state.player;

    if (squares[i] !== null || helpers.getWinner(squares)) {
      return;
    }

    squares[i] = current;

    this.setState(
      {
        history: history.concat({
          squares: squares,
          position: {
            x: helpers.getXPosition(i),
            y: helpers.getYPosition(i)
          }
        }),
        ascendedSorted: true,
        player: current === 'X' ? 'O' : 'X',
        step: history.length
      }
    )
  }

  sortMoves() {
    this.setState({
      ascendedSorted: !this.state.ascendedSorted
    });
  }

  goBackTo(index) {
    this.setState({
      step: index,
      player: index % 2 === 0 ? 'X' : 'O',
      history: this.state.history.slice(0, index + 1)
    });
  }

  render() {
    const history = this.state.history;
    let current = history[this.state.step];
    const winner = helpers.getWinner(current.squares);
    const row = winner ? winner.row : [];
    const over = helpers.isFull(current.squares);
    const moves = history.map((elem, move) =>
      (
        <li key={move}>
          <button onClick={this.goBackTo.bind(this, move)} className={this.state.step === move ? 'bold' : ''}>
            Go to {move === 0 ? 'game start' : `move #${move} (${elem.position.x}, ${elem.position.y})`}
          </button>
        </li>
      )
    );
    let status;

    if (winner) {
      status = `Winner is :  ${winner.name}`
    } else if (!winner && !over) {
      status = `Next player :  ${this.state.player}`;
    } else {
      status = 'Game over : The game ended in a draw';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onPlayTurn={this.handlePlayTurn.bind(this)} winnerRow={row} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.sortMoves.bind(this)}>Sort moves</button>
          <ol>{this.state.ascendedSorted ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;