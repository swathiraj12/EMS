import React, { useEffect, useState } from 'react'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import { useAuth } from '../Context/ContextAuth'
import PreLoader from './PreLoader'
import cover from '../Assets/Images/cardcover.jpg'

const EmployeeProfile = () => {
    const { user } = useAuth()
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    //Function to fetch user by email
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
    //Pre-loader
    if (loading) {
        return <PreLoader />;
    }
    return (
        <>
            <div className="container view-emp mb-3">
                <div className="row d-flex justify-content-center">
                    {/* Employee card */}
                    <div className="card shadow emp-card">
                        <div className="card-body">
                            <div style={{ position: 'relative', height: '150px', overflow: 'visible' }}>

                                <img src={cover} alt="Cover" className="img-fluid" style={{ height: "200px", width: "100%" }} />

                                <img src={employee.picture?.imageUrl} alt="Profile" className="img-fluid rounded-circle" style={{ height: "100px", width: "100px", position: "absolute", bottom: "-90px", left: "50%", transform: "translateX(-50%)" }} />
                            </div>

                            <div className="row mt-5">
                                <h2 className="text-center fw-semibold text-uppercase mt-5" style={{ color: '#694F8E'}}>{employee.name} <span className="text-secondary text-capitalize fs-6">({employee.role})</span></h2>
                                <h5 className="text-center text-secondary text-capitalize">{employee.designation}</h5>
                                <h6 className="text-center text-secondary text-uppercase">({employee.serialNo})</h6>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-6">

                                    <div className='row'>
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Address :</label>
                                        <h5 className="fw-normal card-detail address col-md-12 col-sm-8">
                                            {employee.address?.address1},
                                            <br /> {employee.address?.address2},<br /> {employee.address?.state},
                                            <br /> {employee.address?.pincode}</h5>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Contact No. :</label>
                                        <h5 className="fw-normal card-detail col-md-12 col-sm-8">{employee.phnNum}</h5>
                                    </div>
                                    
                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Emergency Contact No. :</label>
                                        <h5 className="fw-normal card-detail col-md-12 col-sm-8">{employee.emgPhnNo}</h5>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Email :</label>
                                        <h5 className="fw-normal card-detail col-md-12 col-sm-8">{employee.email}</h5>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">DOJ :</label>
                                        <h5 className="fw-normal card-detail col-md-12 col-sm-8">{employee.doj}</h5>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Salary :</label>
                                        <h5 className="fw-normal card-detail col-md-12 col-sm-8">{employee.salary}</h5>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Blood Group :</label>
                                        <h5 className="fw-normal card-detail text-capitalize col-md-12 col-sm-8">{employee.bloodGrp}</h5>
                                    </div>
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