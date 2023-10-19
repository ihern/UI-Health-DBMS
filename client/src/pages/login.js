import React from 'react'

export default function 
() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action="">
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='username' placeholder='Enter Username' className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' className='form-control rounded-0'/>
                </div>

                <button className='btn btn-success w-100 pad2x rounded-0'>Login</button>

                <p></p>

                <button className='btn btn-default border w-100 bg-light rounded-0'>Register Patient</button>
            </form>
        </div>
    </div>
  )
}
