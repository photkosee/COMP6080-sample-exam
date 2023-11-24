import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Blanko from './components/Blanko';
import Slido from './components/Slido';
import Treto from './components/Treto';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Tower from './components/Tower';

const PageList = () => {
  return (
    <>
      <Navbar />

      <div className='
        w-full min-h-screen flex justify-center items-center
        relative pt-[80px] pb-[50px]
        '
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/treto" element={<Treto />} />
          <Route path="/tower" element={<Tower />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default PageList;
