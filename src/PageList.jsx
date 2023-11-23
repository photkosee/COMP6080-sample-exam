import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PageList = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/blanko" element={<Blanko />} />
        <Route path="/slido" element={<Slido />} />
        <Route path="/treto" element={<Treto />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default PageList;
