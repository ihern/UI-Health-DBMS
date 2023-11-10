import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './registerValidation'
import Axios from 'axios'

export default function Register () {

  const [values, setValues] = useState({
    ssn: '',
    fname: '',
    mi: '',
    lname: '',
    address: '',
    phone_number: '',
    race: '',
    gender: '',
    age: '',
    medical_history: '',
    occupation_class: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    //   setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => { 
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);

        // Condition to check that all necessary fields are populated and there are no errors
        // if (err.fname === "" && err.lname === "" && err.ssn === "" && err.age === ""
        //     && err.gender === "" && err.race === "" && err.occupation_class === ""
        //     && err.phone_number === "" && err.address === "" && err.email === ""
        //     && err.password === "") {

        //     // Posting data to UI-Health database
        //     Axios.post("http://localhost:4000/register", values)
        //     .then(res => {
        //         navigate('/');
        //         console.log(res.data);
        //     })
        //     .catch(err => console.log(err));
        // }

        // Posting data to UI-Health database
        Axios.post("http://localhost:4000/register", values)
        .then(res => {
            navigate('/');
            console.log(res.data);
        })
        .catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Register Patient</h2>
            <form action="" onSubmit={handleSubmit}>
                
                <div className='mb-3'>
                    <label htmlFor='fname'><strong>First Name</strong></label>
                    <input type='name' placeholder='Enter First Name' name='fname'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.fname && <span className='text-danger'> {errors.fname}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='mi'><strong>Middle Name</strong></label>
                    <input type='name' placeholder='Enter Middle Name' name='mi'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='lname'><strong>Last Name</strong></label>
                    <input type='name' placeholder='Enter Last Name' name='lname'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.lname && <span className='text-danger'> {errors.lname}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='ssn'><strong>SSN</strong></label>
                    <input type='number' placeholder='Enter Social Security Number' name='ssn'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.ssn && <span className='text-danger'> {errors.ssn}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='age'><strong>Age</strong></label>
                    <input type='number' placeholder='Enter Age' name='age'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.age && <span className='text-danger'> {errors.age}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='gender'><strong>Gender</strong></label>
                    <input type='text' placeholder='Enter Gender' name='gender'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.gender && <span className='text-danger'> {errors.gender}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='race'><strong>Race</strong></label>
                    <input type='text' placeholder='Enter Race' name='race'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.race && <span className='text-danger'> {errors.race}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='occupation_class'><strong>Occupation Class</strong></label>
                    <input type='text' placeholder='Enter Occupation Class' name='occupation_class'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.occupation_class && <span className='text-danger'> {errors.occupation_class}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='medical_history'><strong>Medical History</strong></label>
                    <input type='text' placeholder='Briefly Describe Medical History' name='medical_history'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='phone_number'><strong>Phone Number</strong></label>
                    <input type='number' placeholder='Enter Phone Number' name='phone_number'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.phone_number && <span className='text-danger'> {errors.phone_number}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='address'><strong>Address</strong></label>
                    <input type='text' placeholder='Enter Address' name='address'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.address && <span className='text-danger'> {errors.address}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='text' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>

                <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>Register</button>

                <p></p>

                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0'>Login</Link>
            </form>
        </div>
    </div>
  )
}