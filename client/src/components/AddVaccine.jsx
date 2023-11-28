import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

function AddVaccine() {

  const [values, setValues] = useState({
    name: '',
    company_name: '',
    number_of_doses: '',
    available: '',
    on_hold: '',
    description: ''
  })

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => { 
    event.preventDefault();

    // Posting data to UI-Health database
    Axios.post("http://localhost:4000/addVaccine", values)
    .then(res => {
        navigate('/adminHome');
        console.log(res.data);
    })
    .catch(err => console.log(err));
}

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Add Vaccine</h3>
        <form onSubmit={handleSubmit}>

          <div className='mb-3'>
              <label htmlFor='name'><strong>Vaccine Name</strong></label>
              <input type='text' placeholder='Enter Vaccine Name' name='name'
              onChange={handleInput} className='form-control rounded-0'/>
          </div>

          <div className='mb-3'>
            <label htmlFor='company_name'><strong>Company Name</strong></label>
            <input type='text' name='company_name' className='form-control rounded-0' 
            placeholder='Enter Company Name' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='number_of_doses'><strong>Number of Doses</strong></label>
            <input type='number' name='number_of_doses' className='form-control rounded-0' 
            placeholder='Enter Number of Doses' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='employee_id'><strong>Number Available</strong></label>
            <input type='number' name='available' className='form-control rounded-0' 
            placeholder='Enter Number Available' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='address'><strong>On Hold</strong></label>
            <input type='number' name='on_old' className='form-control rounded-0' 
            placeholder='Enter Address' onChange={handleInput} />
          </div>

          <div className='mb-3'>
            <label htmlFor='Description'><strong>Description</strong></label>
            <input type='text' name='description' className='form-control rounded-0' 
            placeholder='Enter Description' onChange={handleInput} />
          </div>

          <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>Add Vaccine</button>

        </form>
      </div>
    </div>
  )
}

export default AddVaccine