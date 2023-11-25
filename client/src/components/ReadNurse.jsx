import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

function ReadNurse() {

  const [data, setData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_nurse/${id}`)
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [])
  
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Nurse: {id}</h1>
      <Link to="/adminHome" className="btn btn-success">Back</Link>
      <p></p>
      {data.map((nurse) => {
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
    </div>
  );
}

export default ReadNurse