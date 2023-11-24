import React, { useEffect, useState } from 'react';
import { countWon } from './Blanko';

const initialRow = 12;
const initialColumn = 10;

const Treto = () => {
  const [cells, setCells] = useState(
    Array.from({ length: initialRow }, () => Array(initialColumn).fill(0))
  );
  const [completedRows, setCompletedRows] = useState(0);
  const [timer, setTimer] = useState(null);
  const fallenBlock = [
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1]],
    [[0, 0]],
  ];

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (completedRows >= 5) {
      alert('Congrats!');
      countWon();
      init();
    }
  }, [completedRows]);

  const init = () => {
    setCells(Array.from({ length: initialRow }, () =>
      Array(initialColumn).fill(0)
    ));
    setCompletedRows(0);
  };

  return (
    <>
      <div className='
        w-full flex flex-col gap-[20px] justify-center items-center
        mx-[20px] mt-[20px] mb-[100px]
        '
      >
        <div className='
          w-full min-h-[calc(100vh-320px)] grid gird-rows-12 grid-cols-10
          place-content-stretch relative
          '
        >
          {
            cells.map((row) => (
              row.map((cell, colIndex) => (
                <div className={`
                  border-solid border-[1px] border-[#333] m-0
                  ${cell ? 'fill-[rgb(0,255,0)]' : ''}
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

export default Treto;
