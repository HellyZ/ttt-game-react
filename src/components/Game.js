import React, { useEffect, useState } from 'react';
import { calculateWinner } from '../helper';
import Board from './Board';

const Game = () => {
  const [gameIsActive, setGameIsActive] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [winnerHistory, setWinnerHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [xNext, setXNext] = useState(true);
  const [currentWinner, setCurrentWinner] = useState(null);

  useEffect(()=>{
    let hasWinner = calculateWinner(history[currentStep]);
    if (hasWinner) {
      setCurrentWinner(hasWinner);
      setWinnerHistory([...winnerHistory, hasWinner])
    }
    if (currentWinner) {
      setGameIsActive(true);
    }
  }, [history])


  const handleClick = (i) => {
    if (!currentWinner) {
      
      const currentBoardState = history[currentStep];
      const squares = [...currentBoardState];
        if (!squares[i]) {
          squares[i] = xNext ? 'X' : 'O';
          setHistory([...history, squares]);
          setXNext(!xNext);
          setCurrentStep(currentStep+1);
        } else {
          return
        }
    }
  };

  const goTo = (step) => {
    setCurrentStep(step);
    setXNext(step % 2 === 0);
    if (step === 0) {
      setHistory([Array(9).fill(null)]);
      setCurrentWinner(null);
      setGameIsActive(false);
    }

  }

  const renderMoves = () => 
    history.map((_step, move) => {
      const destination = move ? `Go to move №${move}` : <p className="btn-start">Go to start</p>;
      return (
        <li key={move}>
          <button onClick={() => goTo(move)}>{destination}</button>
        </li>
      )
  });

  const renderWinnerHistory = () => {
    if (winnerHistory.length === 0) {
      return <li className="noOne">no one</li>
    }; 
    return winnerHistory.map((entry, index) => <li key={index}>{entry} wins ! </li>)
  };

  return (
    <>
      <h1> Tic Tac Toe Game</h1>
      <Board squares={history[currentStep]} onClick={handleClick} gameIsActive={gameIsActive}/>
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>
          {currentWinner ? `Winner: ${currentWinner}` : `Next Player:  ${xNext ? 'X' : 'O'}`}
        </h3>
        <div>
          <h3>Winner History</h3>
            <div className="winnerHistory-list">
              {renderWinnerHistory()}
            </div>
        </div>
      </div>
    </>
  );
};

export default Game;
