import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link } from 'react-router-dom';
import './loginValidation';
import Validation from './loginValidation';

export default function () {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Admin', value: '1' },
        { name: 'Nurse', value: '2' },
        { name: 'Patient', value: '3' },
      ];

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        setErrors(Validation(values));
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
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>

                <ButtonGroup className="mb-3">
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>

                <button className='btn btn-success w-100 pad2x rounded-0'>Login</button>

                <p></p>

                <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0' text-decoration>Register Patient</Link>
            </form>
        </div>
    </div>
    )
}
