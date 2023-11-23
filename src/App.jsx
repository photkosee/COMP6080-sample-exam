import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PageList from './PageList';

const App = () => {
  return (
    <div className='m-0'>
      <Router>
        <PageList />
      </Router>
    </div>  
  );
};

export default App;
