import React from 'react';

function Square(props) {
  return (
    <button className={`square ${props.highlighted ? 'highlight' : ''}`}  onClick={props.setSquareValue}>
      {props.value}
    </button>
  );
}

export default Square;