import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../styles.css';


export default function Admin () {

  const [nurseData, setNurseData] = useState([])
  const [patientData, setPatientData] = useState([])
  const [vaccineData, setVaccineData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {

    // This condition will check for deleted users and update data dynamically
    if (deleted) {
      setDeleted(false)
    }

    // This request will fetch all nurses
    axios.get('/get_nurses')
    .then((res) => {
      setNurseData(res.data)
    })
    .catch((err) => console.log(err))

    // This request will fetch all nurses
    axios.get('/get_patients')
    .then((res) => {
      setPatientData(res.data)
    })
    .catch((err) => console.log(err))

    // This request will fetch vaccine data
    axios.get('/get_vaccines')
    .then((res) => {
      setVaccineData(res.data)
    })
    .catch((err) => console.log(err))

  }, [deleted])

  function handleDelete(id){
    axios.delete(`/delete_nurse/${id}`)
    .then((res)=>{
        setDeleted(true)
    })
    .catch((err)=> console.log(err))
}
  
  return (
    <div className="container">
      <hr/>
      <h3 className="breadcrumb">Admin Dashboard</h3>
      
      <hr/>
      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="card">
            <div className="card-body">
              <nav className="nav flex-column nav-pills nav-gap-y-1">
                <a href="#nurse" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> View Nurse Info
                </a>

                <a href="#patient" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  View Patient Info
                </a>

                <a href="#vaccine" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="13"></rect>
                  <path d="M2 7h20M6 4h5v3H6zM6 17h5v3H6zM18 4h-5v3h5zM18 17h-5v3h5z"></path>
                </svg> View Vaccine Info
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
                  <a href="#nurse" data-toggle="tab" className="nav-link has-icon active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                </li>
                <li className="nav-item">
                  <a href="#patient" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
                </li>
              </ul>
            </div>

            <div className="card-body tab-content max-height: 10px">
              <div className="tab-pane active" id="nurse">
                <h6>Nurse Information</h6>
                <div className='d-flex justify-content-end'>
                  <Link className='btn btn-success' to='/createNurse'>Add Nurse</Link>
                </div>
                <hr/>

                  <Table striped size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        nurseData.map((nurse) => {
                          return (<tr>
                            <td>{nurse.employee_id}</td>
                            <td>{nurse.fname}</td>
                            <td>{nurse.mi}</td>
                            <td>{nurse.lname}</td>
                            <td>{nurse.age}</td>
                            <td>{nurse.gender}</td>
                            <td>{nurse.phone_number}</td>
                            <td>{nurse.address}</td>
                            <td>
                              <Link className='btn btn-success' to={`/readNurse/${nurse.employee_id}`}>Read</Link>
                            </td>
                            <td>
                              <Link className='btn btn-primary' to={`/editNurse/${nurse.employee_id}`}>Edit</Link>
                            </td>
                            <td>
                              <Button onClick={() => handleDelete(nurse.employee_id)} className='btn btn-danger'>Delete</Button>
                            </td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </Table>

              </div>
            </div>

            <div className="card-body">
              <div className="tab-pane" id="patient">
                <h6>Patient Information</h6>
                <hr/>

                <Table striped size="sm">
                    <thead>
                      <tr>
                        <th>SSN</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Race</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Medical History</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        patientData.map((patient) => {
                          return (<tr>
                            <td>{patient.ssn}</td>
                            <td>{patient.fname}</td>
                            <td>{patient.mi}</td>
                            <td>{patient.lname}</td>
                            <td>{patient.address}</td>
                            <td>{patient.phone_number}</td>
                            <td>{patient.race}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.age}</td>
                            <td>{patient.medical_history}</td>
                            <td>
                              <Link className='btn btn-success' to={`/readPatient/${patient.ssn}`}>Read</Link>
                            </td>

                          </tr>)
                        })
                      }
                    </tbody>
                  </Table>
                
              </div>
            </div>

            <div className="card-body">
              <div className="tab-pane" id="vaccine">
                <h6>Vaccine Information</h6>
                <div className='d-flex justify-content-end'>
                  <Link className='btn btn-success' to='/addVaccine'>Add Vaccine</Link>
                </div>
                <hr/>

                <Table striped size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company Name</th>
                        <th>Number of Doses</th>
                        <th>Available</th>
                        <th>On Hold</th>
                        <th>Description</th>
                        <td>

                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        vaccineData.map((vaccine) => {
                          return (<tr>
                            <td>{vaccine.name}</td>
                            <td>{vaccine.company_name}</td>
                            <td>{vaccine.number_of_doses}</td>
                            <td>{vaccine.available}</td>
                            <td>{vaccine.on_hold}</td>
                            <td>{vaccine.description}</td>
                            <td>
                              <Link className='btn btn-primary' to={`/updateVaccine/${vaccine.name}`}>Update</Link>
                            </td>

                          </tr>)
                        })
                      }
                    </tbody>
                  </Table>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

