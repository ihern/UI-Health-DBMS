import React from "react";
import Login from './pages/login';
import Register from './pages/register';
import Patient from './pages/patientDash';
import Admin from './pages/adminDash';
import Nurse from './pages/nurseDash';
import CreateNurse from './components/CreateNurse';
import EditNurse from './components/EditNurse';
import ReadNurse from './components/ReadNurse';
import ReadPatient from './components/ReadPatient';
import ReadVaccine from './components/ReadVaccine';
import UpdateVaccine from './components/UpdateVaccine';
import AddVaccine from "./components/AddVaccine";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/adminHome' element={<Admin />} />
        <Route path='/nurseHome' element={<Nurse />} />
        <Route path='/patientHome' element={<Patient />} />
        <Route path='/createNurse' element={<CreateNurse />} />
        <Route path='/editNurse/:id' element={<EditNurse />} />
        <Route path='/readNurse/:id' element={<ReadNurse />} />
        <Route path='/readPatient/:id' element={<ReadPatient />} />
        <Route path='/readVaccine/:id' element={<ReadVaccine />} />
        <Route path='/updateVaccine/:id' element={<UpdateVaccine />} />
        <Route path='/addVaccine/' element={<AddVaccine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
