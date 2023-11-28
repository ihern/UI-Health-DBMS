import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ReadNurse() {

  const [nurseData, setNurseData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    // Fetching specified nurse data
    axios.get(`/get_nurse/${id}`)
    .then((res) => {
      setNurseData(res.data);
    })
    .catch((err) => console.log(err));

    // Fetching specific nurse schedule data
    axios.get(`/get_nurse_schedule/${id}`)
    .then((res) => {
      setScheduleData(res.data);
    })
    .catch((err) => console.log(err));
  },[id])
  
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Nurse: {id}</h1>
      <Link to="/adminHome" className="btn btn-success">Back</Link>
      <p></p>
      {nurseData.map((nurse) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>Employee ID: </b>
              {nurse.employee_id}
            </li>
            <li className="list-group-item">
              <b>Name: </b>
              {nurse["fname"] + " " + nurse["mi"] + " " + nurse["lname"]}
            </li>
            <li className="list-group-item">
              <b>Age: </b>
              {nurse["age"]}
            </li>
            <li className="list-group-item">
              <b>Gender: </b>
              {nurse["gender"]}
            </li>
            <li className="list-group-item">
              <b>Phone Number: </b>
              {nurse["phone_number"]}
            </li>
            <li className="list-group-item">
              <b>Address: </b>
              {nurse["address"]}
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
    </div>
  );
}

export default ReadNurse