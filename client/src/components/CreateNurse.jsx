import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Validation from '../pages/registerValidation'
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

  const [errors, setErrors] = useState({})

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => { 
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);

    // Posting data to UI-Health database
    Axios.post("http://localhost:4000/registerNurse", values)
    .then(res => {
        navigate('/adminHome');
        console.log(res.data);
    })
    .catch(err => console.log(err));
}

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Register Nurse</h3>
        <form onSubmit={handleSubmit}>

          <div className='mb-3'>
              <label htmlFor='fname'><strong>First Name</strong></label>
              <input type='text' placeholder='Enter First Name' name='fname'
              onChange={handleInput} className='form-control rounded-0'/>
          </div>

          <div className='mb-3'>
            <label htmlFor='mi'><strong>Middle Name</strong></label>
            <input type='text' name='mi' className='form-control rounded-0' 
            placeholder='Enter Middle Name' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='lname'><strong>Last Name</strong></label>
            <input type='text' name='lname' className='form-control rounded-0' 
            placeholder='Enter Last Name' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='employee_id'><strong>Employee ID</strong></label>
            <input type='text' name='employee_id' className='form-control rounded-0' 
            placeholder='Enter Employee ID' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='address'><strong>Address</strong></label>
            <input type='text' name='address' className='form-control rounded-0' 
            placeholder='Enter Address' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='phone_number'><strong>Phone Number</strong></label>
            <input type='number' name='phone_number' className='form-control rounded-0' 
            placeholder='Enter Number' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='gender'><strong>Gender</strong></label>
            <input type='text' name='gender' className='form-control rounded-0' 
            placeholder='Enter Gender' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='age'><strong>Age</strong></label>
            <input type='number' name='age' className='form-control rounded-0' 
            placeholder='Enter Age' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' name='email' className='form-control rounded-0' 
            placeholder='Enter Email'onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' name='password' className='form-control rounded-0' 
            placeholder='Enter Password' onChange={handleInput} />
          </div>

          <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>Register Nurse</button>

        </form>
      </div>
    </div>
  )
}

export default CreateNurse