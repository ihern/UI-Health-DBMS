import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ReadPatient() {

  const [data, setData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_patient/${id}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err))

    // Fetching specific nurse schedule data
    axios.get(`/get_patient_schedule/${id}`)
    .then((res) => {
      setScheduleData(res.data);
    })
    .catch((err) => console.log(err));

    // Fetching specific nurse schedule data
    axios.get(`/get_vaccine_record/${id}`)
    .then((res) => {
      setVaccineData(res.data);
    })
    .catch((err) => console.log(err));

  }, [id]);

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

      {scheduleData.map((timeSlot) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <Table striped size="sm">
              <thead>
                <tr>
                  <th>Scheduled Appointments</th>
                </tr>
              </thead>
              <tbody className="bg-primary">
                <td>{timeSlot.time_slot}</td>
              </tbody>
            </Table>
            </li>
          </ul>
        );
      })}
      
      <h1>Vaccine History</h1>
      <Table>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Date & Time</th>
            <th>Dose Count</th>
            <th>Nurse ID</th>
          </tr>
        </thead>
        <tbody>
          {vaccineData.map((record) => {
            return (
              <tr>
                <td>{record.vaccine}</td>
                <td>{record.vac_time}</td>
                <td>{record.dose_num}</td>
                <td>{record.nurse_id}</td>
              </tr>
            );
          })}
        </tbody>

      </Table>

    </div>
  );
}

export default ReadPatient