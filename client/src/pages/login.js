import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from 'react-router-dom';
import './loginValidation';
import Validation from './loginValidation';
import Axios from 'axios'


export default function () {

    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Admin', value: 'admin' },
        { name: 'Nurse', value: 'nurse' },
        { name: 'Patient', value: 'patient' },
      ];

    const [values, setValues] = useState({
        email: '',
        password: '',
        // source: radioValue
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        setErrors(Validation(values));

        // Posting data to UI-Health database
        Axios.post("http://localhost:4000/login", values)
        .then(res => {

            // TODO: add conditions here to check for admin, nurse and return values from radio value?
            //       to control which home page they are redirected to? have each homepage have specific table views?
            if (res.data === "Success") {
                navigate(`/${radioValue}Home`);
            } else {
                alert("No record found -- try to login again or select the correct user.");
            }
        })
        .catch(err => console.log(err));
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

                <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>Login</button>

                <p></p>

                <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0'>Register Patient</Link>
            </form>
        </div>
    </div>
    )
}
