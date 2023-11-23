import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

function CreateNurse() {
  const [values, setValues] = useState({
    employee_id: '',
    fname: '',
    mi: '',
    lname: '',
    address: '',
    phone_number: '',
    gender: '',
    age: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleSubmit = (event) => { 
    event.preventDefault();

    // Posting data to UI-Health database
    Axios.post("http://localhost:4000/registerNurse", values)
    .then(res => {
        navigate('/adminHome');
        console.log(res.data);
    })
    .catch(err => console.log(err));
}

  return (
    <div className='container vh-1== vw-100 bg-primary'>
      <div className='row'>
        <h3>Register Nurse</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group my-3'>
            <label htmlFor='fName'>First Name</label>
            <input type='text' name='fName' onChange={(e) => setValues({...values, fname: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='mi'>Middle Name</label>
            <input type='text' name='mi' onChange={(e) => setValues({...values, mi: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='lname'>Last Name</label>
            <input type='text' name='lname' onChange={(e) => setValues({...values, lname: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='address'>Address</label>
            <input type='text' name='address' onChange={(e) => setValues({...values, address: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='phone_number'>Phone Number</label>
            <input type='text' name='phone_number' onChange={(e) => setValues({...values, phone_number: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='gender'>Gender</label>
            <input type='text' name='gender' onChange={(e) => setValues({...values, gender: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='age'>Age</label>
            <input type='text' name='age' onChange={(e) => setValues({...values, age: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' onChange={(e) => setValues({...values, email: e.target.value})} />
          </div>

          <div className='form-group my-3'>
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' onChange={(e) => setValues({...values, password: e.target.value})} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNurse