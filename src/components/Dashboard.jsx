import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [won, setWon] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('won')) {
      getScore();
    } else {
      setWon(() => localStorage.getItem('won'));
    }
  }, [won]);

  const getScore = async () => {
    const response = await fetch(
      'https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json'
    );
    const data = await response.json();

    if (data.error) {
      alert('fetching error');
    } else {
      localStorage.setItem('won', data.score);
      setWon(data.score);
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-red-500 text-[2em] break-words text-center'>
          Please choose an option from the navbar.
        </div>

        <div className='flex gap-2 items-center'>
          <div>
            Games won: {won}
          </div>

          <button
            className='btn'
            onClick={() => {
              localStorage.setItem('won', 0);
              setWon(0);
            }}
          >
            (reset)
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
