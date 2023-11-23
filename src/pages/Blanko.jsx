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


const Blanko = () => {
  const [currentString, setCurrentString] = useState('');
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  // Function to choose a random string and set it as the current string
  const chooseRandomString = () => {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const newString = strs[randomIndex];
    setCurrentString(newString);
  };

  // Function to replace 3 non-space characters with input fields
  const replaceCharacters = () => {
    const nonSpaceIndices = [];
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
      inputValues[i] = currentString[randomIndex];
    }

    setInputValues([...inputValues]);
  };

  // useEffect to set up a new game on component mount
  useEffect(() => {
    chooseRandomString();
    replaceCharacters();
  }, []);

  // Function to handle input changes
  const handleInputChange = (index, value) => {
    inputValues[index] = value.toUpperCase(); // Assuming case doesn't matter
    setInputValues([...inputValues]);
    checkValues();
  };

  // Function to check if the entered values are correct
  const checkValues = () => {
    const enteredValues = inputValues.join('');
    if (enteredValues === currentString.replace(/ /g, '')) {
      alert('Correct!');
      setCorrectGuesses(correctGuesses + 1);
      chooseRandomString();
      setInputValues(['', '', '']);
      replaceCharacters();
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center relative'>
      <div className='flex'>
        {currentString.split('').map((char, index) => (
          <div key={index} className='w-10 h-10 border-2 flex justify-center items-center'>
            {inputValues.includes(char) ? (
              <input
                className='w-full h-full'
                type="text"
                maxLength="1"
                value={inputValues[inputValues.indexOf(char)]}
                onChange={(e) => handleInputChange(inputValues.indexOf(char), e.target.value)}
              />
            ) : (
              char
            )}
          </div>
        ))}
      </div>
      
      <button class="
        absolute mt-28 flex justify-center rounded-md bg-indigo-600
        px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        "
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
    </div>
  );
};

export default Blanko;
