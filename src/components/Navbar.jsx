import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from './assets/gitlab_logo.png';

const Navbar = () => {
  const [size, setSize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setSize(() => window.innerWidth > 800);
    };

    setSize(() => window.innerWidth > 800);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='h-[80px] w-full fixed bg-[#eeeeee] flex justify-between'>
      <img src={logo} alt='logo' className='m-[15px] w-[50px] h-[50px]' />

      <div className='flex items-center gap-2 m-2'>
        <button onClick={() => navigate('/')}>
          {size ? 'Home' : 'H'}
        </button>

        <div>|</div>

        <button onClick={() => navigate('/blanko')}>
          {size ? 'Blanko' : 'B'}
        </button>

        <div>|</div>

        <button onClick={() => navigate('/slido')}>
          {size ? 'Slido' : 'S'}
        </button>

        <div>|</div>

        <button onClick={() => navigate('/tetro')}>
          {size ? 'Tetro' : 'T'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
