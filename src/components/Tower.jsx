import React, { useEffect, useState } from 'react';
import { countWon } from './Blanko';

const initialRow = 12;
const initialColumn = 10;
const initialWidth = 4;

const Tower = () => {
  const [cells, setCells] = useState(
    Array.from({ length: initialRow }, () => Array(initialColumn).fill(0))
  );
  const [timer, setTimer] = useState(null);
  const [currentRow, setCurrentRow] = useState(11);
  const [direction, setDirection] = useState(true);
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (gameOn) {
      moving();
    }

    const timerInterval = window.setInterval(() =>
      setTimer((timer) => timer + 1), 50 * (currentRow + 1)
    );

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, gameOn]);

  const moving = () => {
    const tmpCells = [...cells];

    if (direction) {
      tmpCells[currentRow][tmpCells[currentRow].indexOf(1) + 4] = 1;
      tmpCells[currentRow][tmpCells[currentRow].indexOf(1)] = 0; 
    } else {
      tmpCells[currentRow][tmpCells[currentRow].indexOf(1) - 1] = 1;
      tmpCells[currentRow][tmpCells[currentRow].indexOf(1) + 4] = 0; 
    }

    if (
      tmpCells[currentRow][0] === 1 ||
      tmpCells[currentRow][initialColumn - 1] === 1
    ) {
      setDirection((prev) => !prev);
    }

    setCells(tmpCells);
  };

  const init = () => {
    setCells(Array.from({ length: initialRow }, () =>
      Array(initialColumn).fill(0)
    ));
    setCurrentRow(11);
    setGameOn(false);
  };

  const checkValid = (tmpCells) => {
    if (currentRow < 11) {
      for (let i = 0; i < initialColumn; i++) {
        if (
          tmpCells[currentRow][i] === 1 &&
          tmpCells[currentRow + 1][i] !== 1
        ) {
          tmpCells[currentRow][i] = 0;
        }
      }
    }

    if (tmpCells[currentRow].includes(1)) {
      if (currentRow === 0) {
        alert('Congrats!');
        countWon();
        init();
      } else {
        tmpCells[currentRow - 1].fill(1, 0, initialWidth);
        setCells(tmpCells);
        setCurrentRow((prev) => prev - 1);
      }
    } else {
      alert('Fail!');
      init();
    }
  };

  const handleOnClick = () => {
    const tmpCells = [...cells];

    if (!gameOn) {
      setGameOn(true);
      tmpCells[currentRow].fill(1, 0, initialWidth);
      setCells(tmpCells);
    } else {
      checkValid(tmpCells);
    }
  };

  return (
    <>
      <div className='
        w-full flex flex-col justify-center items-center
        mx-[20px] mt-[20px] mb-[100px]
        '
      >
        <div className='
          w-full min-h-[calc(100vh-320px)] grid gird-rows-12 grid-cols-10
          place-content-stretch relative
          '
          onClick={() => handleOnClick()}
        >
          {
            cells.map((row) => (
              row.map((cell, colIndex) => (
                <div className={`
                  border-solid border-[1px] border-[#333] m-0
                  ${cell ? 'bg-[rgb(0,255,0)]' : ''}
                  `}
                  key={colIndex}
                />
              ))
            ))
          }
        </div>

        <button className='
          btn absolute bottom-[100px]
          '
          onClick={() => init()}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Tower;
