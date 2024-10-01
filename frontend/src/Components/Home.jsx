import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/ContextAuth'
import dashboardImg from '../Assets/Images/dashboardBanner.png'
import { NavLink } from "react-router-dom"
import axios from 'axios'
import '../Assets/CSS/Home.css'

const Home = () => {
  const [empTotalCount, setEmpTotalCount] = useState(0)

  const { user } = useAuth()
  // console.log(user);

  // Getting total employee count
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getusers')
      const empCountList = response.data.users
      //Filter employees list based on role
      const employees = empCountList.filter(user => user.role === 'Employee')
      setEmpTotalCount(employees.length)
    } catch (error) {
      console.log('Error in fetching the users', error);
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="container-fluid">
      {/* Home banner image */}
      <div className="row">
        <div className="col-lg-12 mt-5 d-flex justify-content-center">
          <img src={dashboardImg} className='img-fluid rounded-4 dashBannerImg' alt="" />
        </div>
      </div>
      {/* Home page cards */}
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-4 d-flex justify-content-center">
          <div className="card empCountCard w-75 h-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-center">
                <h2 className='empCount mx-3'>
                  {empTotalCount > 0 ? empTotalCount : 'NIL'}
                </h2>
                <h2 className='mx-3'>
                  <i className="fa-solid fa-users" style={{ color: '#694f8e' }}></i>
                </h2>
              </div>
              <h5 className='empCountCardName mt-3'>Total Employees</h5>
              {
                user?.role === 'Admin' ? (
                  <h6 className="empCardMoreInfo mt-3"><NavLink to='/employee'>More Info</NavLink></h6>
                ) : ('')
              }


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home