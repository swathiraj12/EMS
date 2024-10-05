import React, { useEffect, useState } from 'react'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import { useAuth } from '../Context/ContextAuth'
import PreLoader from './PreLoader'

const EmployeeProfile = () => {
    const { user } = useAuth()
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)

    console.log('email:', user.email);


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
        return <PreLoader />;
    }
    return (
        <>
            <div className="container view-emp">
                <div className="row">
                    <div className='view-emp-display'>

                        <div className="card emp-card mt-3 mb-3 d-flex flex-row justify-content-center">
                            <div className="row g-0">
                                <div className="emp-card-image">
                                    <img src={employee.picture?.imageUrl} alt="" className="img-fluid card-img" />
                                </div>

                                <div className="emp-card-details card-body">
                                    <div className="emp-card-head">
                                        <h3 className="card-title text-center mt-3">{employee.name}</h3>
                                        <h6 className="card-title text-center mt-2 mb-3">{employee.designation}</h6>
                                    </div>
                                    <h6 className="mt-3"><span>Role:</span> {employee.role}</h6>
                                    <h6 className="mt-3" style={{ textTransform: 'uppercase' }}><span>Serial No.:</span> {employee.serialNo}</h6>
                                    <h6 className="mt-3"><span>Email:</span> {employee.email}</h6>
                                    <h6 className="mt-3"><span>Contact No.:</span> {employee.phnNum}</h6>
                                    <h6 className="mt-3"><span>Emergency No.:</span> {employee.emgPhnNo}</h6>
                                    <h6 className="mt-3" style={{ textTransform: 'capitalize' }}><span>Blood Group:</span> {employee.bloodGrp}</h6>
                                    <h6 className="address mt-3" style={{ textTransform: 'capitalize' }}><span>Address:</span> {employee.address?.address1},
                                        <br /> {employee.address?.address2},<br /> {employee.address?.state},<br /> {employee.address?.pincode}</h6>
                                    <h6 className="mt-3"><span>Date of Join:</span> {employee.doj}</h6>
                                    <h6 className="mt-3"><span>Salary:</span> {employee.salary}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeProfile