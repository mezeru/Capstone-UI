import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import {HR} from './components/HR';
import { AddNew } from './components/new/AddNew';
import { AllEmployees } from './components/new/AllEmployees';
import { Employee } from './components/Employee';
import { RedeemNew } from './components/Employee/RedeemNew';
import { RedeemedItems } from './components/Employee/RedeemedItems';
import { HRStruct } from './components/new/HRStructure';
import { Manager } from './components/Manager';
import { EmpSuper } from './components/Manager/EmpSuper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route index path='/HR/Reassign' element={<AllEmployees />} />
          <Route  path='/HR/add' element={<AddNew />} />
          <Route  path='/HR/Structure' element={<HRStruct />} />
          
          <Route path='/HR' element={<HR />} />

          <Route path='/Manager/view' element={<EmpSuper />} />
          <Route path='/Manager' element={<Manager />} />
          <Route path='/Employee/redeemed' element={<RedeemedItems/>} />
          <Route path='/Employee/newItem' element={<RedeemNew/>} />
          <Route path='/Employee' element={<Employee/>} />
          <Route path='/' element={<Home />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
