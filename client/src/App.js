import React from "react";
import Login from './pages/login';
import Register from './pages/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/adminHome' element={<adminHome />}></Route>
        <Route path='/nurseHome' element={<nurseHome />}></Route>
        <Route path='/patientHome' element={<patientHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
