import React, { useEffect, useState } from 'react';

const strs = [
  'the fat cats',
  'larger frogs',
  'banana cakes',
  'unsw vs usyd',
  'french toast',
  'hawaii pizza',
  'barack obama',
];

export const countWon = () => {
  const won = parseInt(localStorage.getItem('won')) + 1;
  localStorage.setItem('won', won);
}

const Blanko = () => {
  const [currentString, setCurrentString] = useState('');
  const [randomInputIndexes, setRandomInputIndexes] = useState([]);
  const [expectedValues, setExpectedValues] = useState([]);
  const [inputValues, setInputValues] = useState({});

  // Setup the game
  useEffect(() => {
    init();
  }, []);

  // Choosing a random string from the list
  const chooseRandomString = () => {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const newString = strs[randomIndex];
    setCurrentString(newString);

    return newString;
  };

  // Picking 3 random characters from string (which is not empty)
  const init = () => {
    const currentString = chooseRandomString();
    const nonSpaceIndices = [];
    const newRandomIndexes = [];
    const newExpectedValues = [];

    for (let i = 0; i < currentString.length; i++) {
      if (currentString[i] !== ' ') {
        nonSpaceIndices.push(i);
      }
    }

    for (let i = 0; i < 3; i++) {
      const randomIndex = nonSpaceIndices.splice(
        Math.floor(Math.random() * nonSpaceIndices.length),
        1
      )[0];
      newRandomIndexes.push(randomIndex);
    }

    newRandomIndexes.sort().forEach((index) =>
      newExpectedValues.push(currentString[index])
    );

    setInputValues({});
    setExpectedValues(newExpectedValues);
    setRandomInputIndexes(newRandomIndexes);
  };

  // An event handle an input
  const handleInputChange = (index, value) => {
    const tmpInputValues = { ...inputValues };

    tmpInputValues[index] = value;
    setInputValues(tmpInputValues);
    checkValues(tmpInputValues);
  };

  // Checking if the entered values are correct
  const checkValues = (tmpInputValues) => {
    if (
      expectedValues.join('').toLowerCase() ===
        Object.values(tmpInputValues).join('').toLowerCase()
    ) {
      alert('Correct!');
      countWon();
      init();
    }
  };

  return (
    <>
      <div className='grid grid-cols-12'>
        {currentString.split('').map((char, index) => (
          <div key={index}>
            {randomInputIndexes.includes(index) ? (
              <input className='
                w-10 h-10 border-2 text-center flex items-center justify-center
                '
                type="text"
                maxLength="1"
                value={inputValues[index] ? inputValues[index] : ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ) : (
              <div className='
                w-10 h-10 border-2 text-center flex items-center justify-center
                '
              >
                {char}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="absolute mt-28 btn" onClick={() => init()}>
        Reset
      </button>
    </>
  );
};

export default Blanko;
