import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useLocation } from 'react-router-dom';

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
  // const ssn = 90;
  // Send email from login and use it to query patient data

  useEffect (() => {

    console.log(emailData);
    // e.preventDefault();

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
            } else {
              console.log("ERROOOORRRRRRRRRR");
            }
        })
        .catch(err => console.log(err));
  },[emailData]);
  
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>Profile Information
                </a>
                <a href="#account" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings mr-2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Account Settings
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
                    
                    <label>Vaccine Time</label>
                    <input type="text" className="form-control" id="vaccine"/>

                  </div>
                  <div className="form-group small text-muted my-2">
                    All of the fields on this page should be updated to be the most accurate.
                  </div>
                  <button type="button" className="btn btn-primary">Update Profile</button>
                </form>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-pane" id="account">
                <h6>ACCOUNT SETTINGS</h6>
                <hr/>
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email"/>
                  </div>
                  <hr/>
                  <div className="form-group">
                    <label className="d-block text-danger">Delete Account</label>
                    <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                  <button className="btn btn-danger" type="button">Delete Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

