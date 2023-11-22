import React from "react";
import Login from './pages/login';
import Register from './pages/register';
import Patient from './pages/patientDash';
import Admin from './pages/adminDash';
import Nurse from './pages/nurseDash';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/adminHome' element={<Admin />}></Route>
        <Route path='/nurseHome' element={<Nurse />}></Route>
        <Route path='/patientHome' element={<Patient />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
