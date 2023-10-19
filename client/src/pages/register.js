import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Validation } from './loginValidation'

export default function() {

  const [values, setValues] = useState({
    name: '',
    ssn: '',
    age: '',
    gender: '',
    race: '',
    occupation: '',
    medhist: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => { 
      event.preventDefault();
      setErrors(Validation(values))
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-Up</h2>

            <form action="" onSubmit={handleSubmit}>
                
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type='name' placeholder='Enter Full Name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='ssn'><strong>SSN</strong></label>
                    <input type='ssn' placeholder='Enter Social Security Number' name='ssn'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='age'><strong>Age</strong></label>
                    <input type='age' placeholder='Enter Age' name='age'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='gender'><strong>Gender</strong></label>
                    <input type='gender' placeholder='Enter Gender' name='gender'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='race'><strong>Race</strong></label>
                    <input type='race' placeholder='Enter Race' name='race'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='occupation'><strong>Occupation</strong></label>
                    <input type='occupation' placeholder='Enter Occupation Class' name='occupation'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='medhist'><strong>Medical History</strong></label>
                    <input type='medhist' placeholder='Briefly Describe Medical History' name='medhist'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='phone'><strong>Phone Number</strong></label>
                    <input type='phone' placeholder='Enter Phone Number' name='phone'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='address'><strong>Address</strong></label>
                    <input type='address' placeholder='Enter Address' name='address'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <button className='btn btn-success w-100 pad2x rounded-0'>Register</button>

                <p></p>

                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0' text-decoration>Login</Link>
            </form>
        </div>
    </div>
  )
}