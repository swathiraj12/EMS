import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'

const AdminProfile = () => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getusers')
            setUsers(response.data.users)
            console.log(response.data.users);

        } catch (error) {
            console.log('Error in fetching the users', error);
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    const removeEmployee = async (_id) => {
        await axios.delete(`http://localhost:4000/deluser/${_id}`)
        fetchEmployees()
    }

    const editEmployee = (_id) => {
        console.log('Id:', _id);
        navigate(`/editemp/${_id}`)
    }
  return (
      <div className="container view-emp">
          <div className="row">
              <div className='view-emp-display xxl-justify-content-center'>
                  {
                      users
                          .filter(user => user.role !== 'Employee')
                          .map((user) => (
                              <div className="card emp-card mt-3 mb-3 d-flex flex-row justify-content-center" key={user._id}>
                                  <div className="emp-card-name mt-5 col-md-12 col-12">
                                      <h3 className="card-title text-center mt-5" style={{ textTransform: 'uppercase' }}>{user.name}</h3>

                                      <h6 className="card-title text-center mt-3 mb-5" style={{ textTransform: 'uppercase' }}>{user.designation}</h6>

                                      <div className="emp-card-image col-12">
                                          <img src={user.picture.imageUrl} alt="" className='img-fluid card-img' />
                                      </div>
                                  </div>
                                  <div className="emp-card-details card-body p-3 md-col-12">
                                      <h1 className='text-center'>ems</h1>

                                      <h6 className='mt-3'><span>Role:</span> {user.role}</h6>

                                      <h6 className='mt-3' style={{ textTransform: 'uppercase' }}><span>Serial No.:</span> {user.serialNo}</h6>

                                      <h6 className='mt-3'><span>Email:</span> {user.email}</h6>

                                      <h6 className='mt-3'><span>Contact No.:</span> {user.phnNum}</h6>

                                      <h6 className='mt-3'><span>Emergency No.:</span> {user.emgPhnNo}</h6>

                                      <h6 className='mt-3' style={{ textTransform: 'capitalize' }}><span>Blood Group:</span> {user.bloodGrp}</h6>

                                      <h6 className='address mt-3'><span>Address:</span> {user.address.address1},<br /> {user.address.address2},<br /> {user.address.state},<br /> {user.address.pincode}</h6>

                                      <h6 className='mt-3'><span>Date of Join:</span> {user.doj}</h6>

                                      <h6 className='mt-3'><span>Salary:</span> {user.salary}</h6>

                                      <div className='emp-nav d-flex justify-content-center mt-3'>
                                          <button className='btn nav-btn' onClick={() => editEmployee(user._id)}><i className="fa-solid fa-user-pen"></i></button>

                                          <button className='btn nav-btn' onClick={() => removeEmployee(user._id)}><i className="fa-solid fa-user-xmark"></i></button>
                                      </div>
                                  </div>
                              </div>
                          ))
                  }
              </div>
          </div>
      </div>
  )
}

export default AdminProfile