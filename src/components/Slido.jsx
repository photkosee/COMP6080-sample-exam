import React, { useEffect, useState } from 'react';

import a from './assets/1.png';
import b from './assets/2.png';
import c from './assets/3.png';
import d from './assets/4.png';
import e from './assets/5.png';
import f from './assets/6.png';
import g from './assets/7.png';
import h from './assets/8.png';
import { countWon } from './Blanko';

const expectedArray = [a, b, c, d, e, f, g, h, ''];

const Slido = () => {
  const [slides, setSlides] = useState([]);
  const movableCell = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7]
  }

  // Shuffling the slides randomly (it can't be solved)
  useEffect(() => {
    init();
  }, []);

  // Check whether the pattern is complete
  useEffect(() => {
    if (isSolve(expectedArray, slides)) {
      countWon();
      init();
    }
  }, [slides]);

  const init = () => {
    let shuffledArray = [...expectedArray];

    do {
      shuffledArray = shuffledArray.sort(() => Math.random() - 0.5);
    } while (isSolve(expectedArray, shuffledArray));

    setSlides(shuffledArray);
  };

  // Whether all the slides are matching with the expected result
  const isSolve = (arr1, arr2) => {
    return arr1.every((element, index) => element === arr2[index]);
  };

  // Get the reachable cell if there is any
  const getMovableCell = (index) => {
    let destIndex = null;

    for (const reachableIndexes of movableCell[index]) {
      if (slides[reachableIndexes] === '') {
        destIndex = reachableIndexes;
      }
    }

    return destIndex;
  };

  // An event moving a cell
  const handleClick = (index) => {
    let tmpSlides = [...slides];
    let destIndex = getMovableCell(index);

    if (destIndex !== null) {
      tmpSlides[destIndex] = tmpSlides[index];
      tmpSlides[index] = '';
      setSlides(tmpSlides);
    }
  };

  return (
    <>
      <div className='h-full flex flex-col justify-center items-center gap-2'>
        <div className='grid gird-rows-3 grid-cols-3 relative'>
          {slides.map((cell, index) => (
            <div className='
              w-[150px] h-[150px] border-solid border-[1px] border-[#333] m-0
              '
              key={index}
              onClick={() => handleClick(index)}
            >
              {cell &&
                <img src={cell} alt={'slide #' + index} className='w-full h-full' />
              }
            </div>
          ))}
        </div>

        <div className='flex gap-5 absolute mt-[500px] z-30'>
          <button className='btn' onClick={() => setSlides(expectedArray)}>
            Solve
          </button>

          <button className='btn' onClick={() => init()}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Slido;
