import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { gameBoardActions, gameOver, inProgress, paused, preGame } from '../store/game-board';
import useMoveBlock from '../hooks/use-move-block';

let timeOut;
export let squaresRef;
export let statusRef;

const GameBoard = () => {
  const dispatch = useDispatch();
  const squares = useSelector(state => state.gameBoard.squares);
  const speed = useSelector(state => state.gameBoard.speed);
  const timer = useSelector(state => state.gameBoard.timer);
  const status = useSelector(state => state.gameBoard.status);
  squaresRef = useRef(squares);
  squaresRef.current = squares;
  statusRef = useRef(status);
  statusRef.current = status;

  const moveBlock = useMoveBlock();

  const startGame = () => {
    dispatch(gameBoardActions.startGame());
    newBlock();
  };

  const pauseGame = () => {
    dispatch(gameBoardActions.pauseGame());
  };

  const resumeGame = () => {
    dispatch(gameBoardActions.resumeGame());
  };

  const newBlock = () => {
    dispatch(gameBoardActions.nextBlock());
  };

  const moveBlockDown = () => {
    moveBlock('down');
  };

  const moveBlockLeft = () => {
    moveBlock('left');
  };

  const moveBlockRight = () => {
    moveBlock('right');
  };

  // Test function - Can be deleted
  const stopDescent = () => {
    dispatch(gameBoardActions.stopTimer());
  };

  // Test function - Can be deleted
  const startDescent = () => {
    dispatch(gameBoardActions.startTimer());
  };

  const handleKeyPress = event => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveBlockDown();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveBlockLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveBlockRight();
        break;
      case ' ':
        event.preventDefault();
        if (statusRef.current === preGame) {
          startGame();
        } else if (statusRef.current === gameOver) {
          dispatch(gameBoardActions.resetGame());
          startGame();
        } else if (statusRef.current === inProgress) {
          pauseGame();
        } else if (statusRef.current === paused) {
          resumeGame();
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (status === inProgress) {
      if (timer.isLive) {
        timeOut = setTimeout(() => {
          moveBlockDown();
        }, speed);
      }
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [status, timer]);

  return (
    <Fragment>
      <div className='gameboard-container'>
        {Array.from(new Array(Object.keys(squares).length), (_, i) => i).map(row => (
          <div key={`row-${row}`} className='row'>
            {Array.from(
              new Array(Object.keys(squares[Object.keys(squares)[0]]).length),
              (_, i) => i + 1
            ).map(column => (
              <div
                key={`square-${row}-${column}`}
                className={`square ${squares[row][column].status} ${squares[row][column].color}`}
              />
            ))}
          </div>
        ))}
      </div>
      <h1>{status}</h1>
      <div onClick={stopDescent}>STOP DESCENT</div>
      <div onClick={startDescent}>START DESCENT</div>
    </Fragment>
  );
};

export default GameBoard;
