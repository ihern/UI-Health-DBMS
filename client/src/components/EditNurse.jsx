import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditNurse() {

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_nurse/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    console.log("Edit button clicked...\n");
    e.preventDefault();

    axios
      .post(`/edit_nurse/${id}`, data[0])
      .then((res) => {
        navigate("/adminHome");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Update Nurse {id}</h3>
        <Link to="/adminHome" className="btn btn-success">
        Back
        </Link>

        {data.map((nurse) => {
          return (
            <form onSubmit={handleSubmit}>

            <div className='mb-3'>
                <label htmlFor='fname'><strong>First Name</strong></label>
                <input type='text' value={nurse.fname} name='fname'
                onChange={(e) =>
                  setData([{ ...data[0], fname: e.target.value }])
                } className='form-control rounded-0'/>
            </div>

            <div className='mb-3'>
              <label htmlFor='mi'><strong>Middle Name</strong></label>
              <input type='text' name='mi' className='form-control rounded-0' 
              value={nurse.mi}
              onChange={(e) =>
                setData([{ ...data[0], mi: e.target.value }])
              } />
            </div>

            <div className='mb-3'>
              <label htmlFor='lname'><strong>Last Name</strong></label>
              <input type='text' name='lname' className='form-control rounded-0' 
              value={nurse.lname}
              onChange={(e) =>
                setData([{ ...data[0], lname: e.target.value }])
              } />
            </div>

            {/* <div className='mb-3'>
              <label htmlFor='employee_id'><strong>Employee ID</strong></label>
              <input type='text' name='employee_id' className='form-control rounded-0' 
              value={nurse.employee_id} 
              onChange={(e) =>
                    setData([{ ...data[0], employee_id: e.target.value }])
                  } />
            </div> */}

            <div className='mb-3'>
              <label htmlFor='address'><strong>Address</strong></label>
              <input type='text' name='address' className='form-control rounded-0' 
              value={nurse.address} 
              onChange={(e) =>
                    setData([{ ...data[0], address: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='phone_number'><strong>Phone Number</strong></label>
              <input type='number' name='phone_number' className='form-control rounded-0' 
              value={nurse.phone_number} 
              onChange={(e) =>
                    setData([{ ...data[0], phone_number: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='gender'><strong>Gender</strong></label>
              <input type='text' name='gender' className='form-control rounded-0' 
              value={nurse.gender}
              onChange={(e) =>
                    setData([{ ...data[0], gender: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='age'><strong>Age</strong></label>
              <input type='number' name='age' className='form-control rounded-0' 
              value={nurse.age} 
              onChange={(e) =>
                    setData([{ ...data[0], age: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input type='email' name='email' className='form-control rounded-0' 
              value={nurse.email}
              onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input type='text' name='password' className='form-control rounded-0' 
              value={nurse.password} 
              onChange={(e) =>
                    setData([{ ...data[0], password: e.target.value }])
                  } />
            </div>

            <div>
              <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>
                Update Nurse
              </button>
            </div>

          </form>
          );
        })}
      </div>
    </div>
  );
}

export default EditNurse;