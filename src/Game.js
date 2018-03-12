import React from 'react';
import Board from './Borad';
import BoardInfo from './BoardInfo';
import {
  isBoardFull,
  getWinnerInfo
} from './helpers';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: new Array(9).fill(null),
        position: null
      }],
      step: 0,
      player: 'X'
    }
  }

  handlePlayTurn(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const squares = history[history.length - 1].squares.slice();
    const current = this.state.player;

    if (squares[i] !== null || getWinnerInfo(squares)) {
      return;
    }

    squares[i] = current;

    this.setState(
      {
        history: history.concat({
          squares: squares,
          position: i
        }),
        player: current === 'X' ? 'O' : 'X',
        step: history.length
      }
    )
  }

  jumpToMoveHandle(index) {
    this.setState({
      step: index,
      player: index % 2 === 0 ? 'X' : 'O',
      history: this.state.history.slice(0, index + 1)
    });
  }

  render() {
    const history = this.state.history;
    let current = history[this.state.step];
    const winnerInfo = getWinnerInfo(current.squares);
    const gameOver = isBoardFull(current.squares);

    let status;

    if (winnerInfo) {
      status = <span className="processing">Winner is :  <span className="winner bold">palyer {winnerInfo.name}</span></span>
    } else if (!winnerInfo && !gameOver) {
      status = <span className="processing">Next player :  {this.state.player}</span>;
    } else {
      status = <span className="over">Game over : The game ended in a draw</span>;
    }

    return (
      <div className="container">
        <h1 className="title">TIC TAC TOE</h1>
        <div className="status">{status}</div>
        <div className="game">
          <div className="offset"></div>
          <Board
            squares={current.squares}
            onPlayTurn={this.handlePlayTurn.bind(this)}
            winnerInfo={winnerInfo}
          />
          <BoardInfo
            jumpToMove={this.jumpToMoveHandle.bind(this)}
            history={history}
            step={this.state.step}
          />
        </div>
      </div>
    );
  }
}
export default Game;