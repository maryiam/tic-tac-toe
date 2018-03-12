import React from 'react';
import {
  getXPosition,
  getYPosition
} from './helpers';

class BoradInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascended: true
    }
  }
  sortMoves() {
    this.setState({
      ascended: !this.state.ascended
    });
  }
  render() {
    const moves = this.props.history.map((elem, move) =>
      (
        <li key={move}>
          <button onClick={this.props.jumpToMove.bind(this, move)} className={this.props.step === move ? 'bold' : ''}>
            Go to {move === 0 ? 'game start' : `move #${move} (${getXPosition(elem.position)}, ${getYPosition(elem.position)})`}
          </button>
        </li>
      )
    );
    return (
      <div className="game-info">
        <button onClick={this.sortMoves.bind(this)}>Sort moves</button>
        <ol>{this.state.ascended ? moves : moves.reverse()}</ol>
      </div>
    );
  }
}

export default BoradInfo;