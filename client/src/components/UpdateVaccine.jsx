import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateVaccine() {

  const [data, setData] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`/get_vaccine/${name}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [name]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/update_vaccine/${name}`, data[0])
      .then((res) => {
        navigate("/adminHome");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-200'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Update Vaccine: {name}</h3>
        <Link to="/adminHome" className="btn btn-success">
        Back
        </Link>

        {data.map((vaccine) => {
          return (
            <form onSubmit={handleSubmit}>

            <div className='mb-3'>
                <label htmlFor='name'><strong>Vaccine Name</strong></label>
                <input type='text' value={vaccine.name} name='name'
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                } className='form-control rounded-0'/>
            </div>

            <div className='mb-3'>
              <label htmlFor='company_name'><strong>Company Name</strong></label>
              <input type='text' name='company_name' className='form-control rounded-0' 
              value={vaccine.company_name}
              onChange={(e) =>
                setData([{ ...data[0], company_name: e.target.value }])
              } />
            </div>

            <div className='mb-3'>
              <label htmlFor='number_of_doses'><strong>Number of Doses</strong></label>
              <input type='number' name='number_of_doses' className='form-control rounded-0' 
              value={vaccine.number_of_doses}
              onChange={(e) =>
                setData([{ ...data[0], number_of_doses: e.target.value }])
              } />
            </div>

            <div className='mb-3'>
              <label htmlFor='available'><strong>Number Available</strong></label>
              <input type='number' name='available' className='form-control rounded-0' 
              value={vaccine.available} 
              onChange={(e) =>
                    setData([{ ...data[0], available: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='on_hold'><strong>On Hold</strong></label>
              <input type='number' name='on_hold' className='form-control rounded-0' 
              value={vaccine.on_hold} 
              onChange={(e) =>
                    setData([{ ...data[0], on_hold: e.target.value }])
                  } />
            </div>

            <div className='mb-3'>
              <label htmlFor='description'><strong>Description</strong></label>
              <input type='text' name='description' className='form-control rounded-0' 
              value={vaccine.description}
              onChange={(e) =>
                    setData([{ ...data[0], description: e.target.value }])
                  } />
            </div>

            <div>
              <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 pad2x rounded-0'>
                Update Vaccine
              </button>
            </div>

          </form>
          );
        })}
      </div>
    </div>
  );
}

export default UpdateVaccine;