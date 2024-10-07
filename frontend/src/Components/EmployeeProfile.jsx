import React, { useEffect, useState } from 'react'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import { useAuth } from '../Context/ContextAuth'
import PreLoader from './PreLoader'
import cover from '../Assets/Images/dashboardBanner.png'

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

                        <div className="card shadow">
                            <div className="card-body">
                                <div style={{ position: 'relative', height: '150px', overflow: 'visible' }}>
                                    <img src={cover} alt="Cover" className="img-fluid" style={{ height: "200px", width: "100%" }} />
                                    <img src={employee.picture?.imageUrl} alt="Profile" className="img-fluid rounded-circle" style={{ height: "100px", width: "100px", position: "absolute", bottom: "-85px", left: "50%", transform: "translateX(-50%)" }} />
                                </div>
                                <div className="row mt-5">
                                    <h2 className="text-center fw-semibold  mt-5">Sri Ram R <span className="text-secondary fs-6">(EMP)</span></h2>
                                    <h5 className="text-center text-secondary">(Developer)</h5>
                                </div>
                                
                                <div className="row mt-4">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className="form-label fw-bold">Address :</label>
                                        <h5 className="fw-normal">Door no, street, colony, district, state, country code</h5>
                                        <label htmlFor="" className="form-label fw-bold mt-3">Phone Number :</label>
                                        <h5 className="fw-normal">9876543210</h5>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className="form-label fw-bold">Email :</label>
                                        <h5 classname="fw-normal">abc@gmail.com</h5>
                                        <label htmlFor="" className="form-label fw-bold">Blood :</label>
                                        <h5 className="fw-normal">A2B +</h5>
                                        <label htmlFor="" className="form-label fw-bold">DOJ :</label>
                                        <h5 className="fw-normal">01-01-2024</h5>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-success">Delete</button>
                                    <button className="btn btn-warning">Update</button>

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