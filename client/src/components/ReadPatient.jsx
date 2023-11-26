import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
function ReadPatient() {

  const [data, setData] = useState([])
  const [vaccineData, setVaccineData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_patient/${id}`)
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Patient: {id}</h1>
      <Link to="/adminHome" className="btn btn-success">Back</Link>
      <p></p>
      {data.map((patient) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>Social Security Number: </b>
              {patient.ssn}
            </li>
            <li className="list-group-item">
              <b>Name: </b>
              {patient["fname"] + " " + patient["mi"] + " " + patient["lname"]}
            </li>
            <li className="list-group-item">
              <b>Age: </b>
              {patient["age"]}
            </li>
            <li className="list-group-item">
              <b>Gender: </b>
              {patient["gender"]}
            </li>
            <li className="list-group-item">
              <b>Race: </b>
              {patient["race"]}
            </li>
            <li className="list-group-item">
              <b>Address: </b>
              {patient["address"]}
            </li>
            <li className="list-group-item">
              <b>Phone Number: </b>
              {patient["phone_number"]}
            </li>
            <li className="list-group-item">
              <b>Medical History: </b>
              {patient["medical_history"]}
            </li>
            <li className="list-group-item">
              <b>Email: </b>
              {patient["email"]}
            </li>
            <li className="list-group-item">
              <b>Password: </b>
              {patient["password"]}
            </li>
            
          </ul>
        );
      })}
    </div>
  );
}

export default ReadPatient