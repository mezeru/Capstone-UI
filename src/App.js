import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import {HR} from './components/HR';
import { AddNew } from './components/AddNew';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route index path='/HR/add' element={<AddNew />} />
          <Route index path='/HR' element={<HR />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
