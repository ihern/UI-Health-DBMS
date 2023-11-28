import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Patient () {

  const location = useLocation();

  const emailData = location.state && location.state.emailVal;

  const [fname, setFName] = useState('');
  const [mi, setMI] = useState('');
  const [lname, setLName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [race, setRace] = useState('');
  const [history, setHistory] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [ssn, setSSN] = useState();
  const[ timeSlots, setTimeSlots] = useState([]); 
  const[ vaccines, setVaccines] = useState([]); 
  const[ appointments, setAppointments] = useState([]); 
  const[ nurses, setNurses] = useState(); 
  const[ apptNurse, setApptNurse] = useState([]); 
  const[ apptTime, setApptTime] = useState([]); 
  const[ apptVax, setApptVax] = useState([]); 
  const[ warning, setWarning] = useState(''); 
  

  useEffect (() => {

    console.log(emailData);

    Axios.post("http://localhost:4000/patient_dashboard", {emailD: emailData})
    .then(res => {
      console.log(res.data);
      if (res.data) {
        const info = res.data[0]; 
        console.log(info.fname);
        setFName(info.fname);
        setMI(info.mi); 
        setLName(info.lname); 
        setAddress(info.address);
        setPhoneNum(info.phone_number);
        setRace(info.race);
        setHistory(info.medical_history);
        setGender(info.gender);
        setAge(info.age);
        setOccupation(info.occupation_class);
        setEmail(info.email);
        setSSN(info.ssn);
      } else {
        console.log("ERROOOORRRRRRRRRR");
      }
    })
    .catch(err => console.log(err));

    // add a request to get all the time slots from the vaccine_schedule
    Axios.get('/get_schedule')
    .then((res) => {
      const info = res.data; 
      console.log(info);
      const timeSlotStrings = res.data.map(timeSlotObj => timeSlotObj.time_slot);
      const nurseTimeSlotStrings = res.data.map(timeSlotObj => timeSlotObj.nurse_id);
      setTimeSlots(timeSlotStrings);
      setNurses(nurseTimeSlotStrings);
      console.log('Time slot array: ', timeSlotStrings, nurseTimeSlotStrings);
    })
    .catch((err) => console.log(err));

    Axios.get('/get_vaccines_available')
    .then((res) => {
      const vacs = res.data.map(timeSlotObj => timeSlotObj.name);
      console.log('Vaccines array: ', vacs);
      setVaccines(vacs);
    })
    .catch((err) => console.log(err));
    
    Axios.post('/get_appointments_patients', {patient: ssn})
    .then((res) => {
      const appts = res.data.map(apptnObj => apptnObj.time_slot);
      console.log('Appointments for patient: ', appts);
      setAppointments(appts);
    })
    .catch((err) => console.log(err));

  },[emailData, ssn, ]);


  const updateInfo = () => {
    const updatedData = [ fname, mi, lname, address, phoneNum, race, gender, age,history, occupation, email, ssn];
    console.log(updatedData);
    Axios.post("http://localhost:4000/patient_update", updatedData)
        .then(res => {
            if (res.data) {
              console.log("Update successful")
            } else {
              console.log("Did not update correctly");
            }
        })
        .catch(err => console.log(err));
  };

  const makeAppointment = () => {
    const appt = [ apptNurse, ssn, apptTime, apptVax ];
    console.log(appt);

    Axios.post('/patient_per_nurse',  appt)
      .then(res => {
        if (res.data === 'Yes') {
          console.log("Slots full", res.data)
          setWarning('Please select another time slot, this one is full');
        } 
        else {
          setWarning('');
          Axios.post("http://localhost:4000/patient_select_appt", appt)
          .then(resp => {
              if (resp.data === 'Error') {
                console.log("Did not make appointment correctly", resp.data)
              } else {
                console.log("Appointment successful");
              }
          })
          .catch(errr => console.log(errr));
          setApptTime('');
          setApptVax(''); 
        }
    })
    .catch(err => console.log(err));
  };

  const handleDelete = (pSSN, time) => {
    const appt = [pSSN, time];
    console.log('inside handleDelete: ', time);
    Axios.post('/delete_appointments_patients', appt)
      .then((res) => {
        console.log('Returning values:');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <hr/>
      <h2 className="breadcrumb">Patient Dashboard</h2>
      <hr/>
      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="card">
            <div className="card-body">
              <nav className="nav flex-column nav-pills nav-gap-y-1">
                <a href="#profile" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile Information
                </a>
                <a href="#vaccine" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg> Vaccine Scheduling
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header border-bottom mb-3 d-flex d-md-none">
              <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
                <li className="nav-item">
                  <a href="#profile" data-toggle="tab" className="nav-link has-icon active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                </li>
                <li className="nav-item">
                  <a href="#account" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
                </li>
              </ul>
            </div>
            <div className="card-body tab-content">
              <div className="tab-pane active" id="profile">
                <h6>YOUR PROFILE INFORMATION</h6>
                <hr/>
                <form>
                  <div className="form-group my-2">
                    <label>First Name</label>
                    <input value={fname} onChange={(e) => setFName(e.target.value)} type="text" className="form-control" id="fullName"/>
                  
                    <label>MI</label>
                    <input value={mi} onChange={(e) => setMI(e.target.value)} type="text" className="form-control width: 10px" id="MI"/>
                  
                    <label>Last Name</label>
                    <input value={lname} onChange={(e) => setLName(e.target.value)} type="text" className="form-control" id="lastName" />

                    <label>Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address"/>
                    
                    <label>Phone Numbers</label>
                    <input value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} type="text" className="form-control" id="phoneNum"/>

                    <label>Race</label>
                    <input value={race} onChange={(e) => setRace(e.target.value)} type="text" className="form-control" id="race"/>

                    <label>Gender</label>
                    <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="form-control" id="gender"/>

                    <label>Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="form-control" id="age"/>

                    <label>Medical History</label>
                    <input value={history} onChange={(e) => setHistory(e.target.value)} type="text" className="form-control" id="history"/>

                    <label>Occupation</label>
                    <input value={occupation} onChange={(e) =>setOccupation (e.target.value)} type="text" className="form-control" id="occupation"/>
                  
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email"/>
                    
                    <label>SSN</label>
                    <input value={ssn} onChange={(e) => setSSN(e.target.value)} type="text" className="form-control" id="ssn"/>
                  </div>
                  <div className="form-group small text-muted my-2">
                    All of the fields on this page should be updated to be the most accurate.
                  </div>
                  <button type="button" className="btn btn-primary" onClick={updateInfo}>Update Profile</button>
                </form>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-pane" id="vaccine">
                <h6>Vaccination Scheduling / Appointments</h6>
                <hr/>
                <form>
                  <div className="form-group">
                    <label>Time</label>
                    <select value={apptTime} onChange={(e) => {setApptTime(e.target.value); setApptNurse(nurses[e.target.selectedIndex - 1]);}} className="form-select my-3" aria-label="Default select example" id="appointments">
                    <option value="" disabled selected>Appointments Available</option>
                      {timeSlots.map((timeslot, idx) => (
                        <option
                            key={idx}
                            id={`time-${idx}`}
                            variant="outline-primary"
                            name="time"
                            value={timeslot}
                        >
                            {timeslot}
                        </option>
                        ))}
                    </select>
                    <select value={apptVax} onChange={(e) => setApptVax(e.target.value)} className="form-select my-3" aria-label="Default select example" id="appointments">
                    <option value="" disabled selected>Vaccines Available</option>
                      {vaccines.map((vac, idx) => (
                        <option
                            key={idx}
                            id={`time-${idx}`}
                            variant="outline-primary"
                            name="time"
                            value={vac}
                        >
                            {vac}
                        </option>
                        ))}
                    </select>
                    <input value={warning} type="text" className="form-control text-danger" id="error" disabled/>
                    <button type="button" className="btn btn-primary my-2" onClick={makeAppointment}>Submit</button>
                  </div>                  
                </form>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-pane" id="account">
                <h6>Appointments</h6>
                <hr/>
                  <Table striped size="sm">
                    <thead>
                      <tr>
                        <th>Time Slot Scheduled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((timeslot, idx) => (
                        <tr
                            key={idx}
                            id={`time-${idx}`}
                            variant="outline-primary"
                            name="time"
                            value={timeslot}
                        >
                            <td>{timeslot}</td>
                            <td><Button className='btn btn-danger'onClick={() => handleDelete(ssn, timeslot)}>Delete</Button></td>
                        </tr>
                        ))}
                    </tbody>
                  </Table>
                <hr/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

