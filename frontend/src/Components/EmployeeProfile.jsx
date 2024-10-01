import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import { useAuth } from '../Context/ContextAuth'

const EmployeeProfile = () => {
    const {user} = useAuth()
    const [employee, setEmployee] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchEmployee = async () => {

        try {
            const response = await axios.get(`http://localhost:4000/getuser/${user.email}`)
            setEmployee(response.data.users)
            console.log(response.data);
            setLoading(false)
        } catch (error) {
            console.log('Error in fetching the users', error);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchEmployee()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="container view-emp">
            <div className="row">
                <div className='view-emp-display xxl-justify-content-center'>

                    <div className="card emp-card mt-3 mb-3 d-flex flex-row justify-content-center">
                        <div className="emp-card-name mt-5 col-md-12 col-12">
                            <h3 className="card-title text-center mt-5" style={{ textTransform: 'uppercase' }}>{employee.name}</h3>

                            <h6 className="card-title text-center mt-3 mb-5" style={{ textTransform: 'uppercase' }}>{employee.designation}</h6>

                            <div className="emp-card-image col-12">
                                <img src={employee.picture} alt="" className='img-fluid card-img' />
                            </div>
                        </div>
                        <div className="emp-card-details card-body p-3 md-col-12">
                            <h1 className='text-center'>ems</h1>

                            <h6 className='mt-3'><span>Role:</span> {employee.role}</h6>

                            <h6 className='mt-3' style={{ textTransform: 'uppercase' }}><span>Serial No.:</span> {employee.serialNo}</h6>

                            <h6 className='mt-3'><span>Email:</span> {employee.email}</h6>

                            <h6 className='mt-3'><span>Contact No.:</span> {employee.phnNum}</h6>

                            <h6 className='mt-3'><span>Emergency No.:</span> {employee.emgPhnNo}</h6>

                            <h6 className='mt-3' style={{ textTransform: 'capitalize' }}><span>Blood Group:</span> {employee.bloodGrp}</h6>

                            <h6 className='address mt-3'><span>Address:</span> {employee.address},<br /> {employee.address},<br /> {employee.address?.state},<br /> {employee.address?.pincode}</h6>

                            <h6 className='mt-3'><span>Date of Join:</span> {employee.doj}</h6>

                            <h6 className='mt-3'><span>Salary:</span> {employee.salary}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile