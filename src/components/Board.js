import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, gameIsActive }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} gameIsActive={gameIsActive} />
    ))}
  </div>
);

export default Board; 
