import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginValidation';

export default function () {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
    }
    
    return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-In</h2>

            <form action="" onSubmit={handleSubmit}>
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

                <button className='btn btn-success w-100 pad2x rounded-0'>Login</button>

                <p></p>

                <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0' text-decoration>Register Patient</Link>
            </form>
        </div>
    </div>
    )
}
