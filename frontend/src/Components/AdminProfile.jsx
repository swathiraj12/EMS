import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import cover from '../Assets/Images/dashboardBanner.png'

const AdminProfile = () => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    // Hot toast notification---
    // Success notification
    const notifySuccess = (msg) =>
        toast.success(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });

    // Error notification
    const notifyError = (msg) =>
        toast.error(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getusers')
            setUsers(response.data.users)
            notifySuccess(response.data.message || 'Admin details')
            console.log(response.data.users);

        } catch (error) {
            console.log('Error in fetching the users', error);
            notifyError("Error on server")
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
        <>
            {/* React hot toast  */}
            <Toaster position="top-right" reverseOrder={false} />
            <div className="container view-emp">
                <div className="row">
                    <div className='view-emp-display'>
                        {users
                            .filter(user => user.role !== 'Employee')
                            .map((user) => (
                                <div className="card emp-card mt-3 mb-3 d-flex flex-row justify-content-center" style={{ maxWidth: '500px' }} key={user._id}>
                                    <div className="row g-0">
                                        <div className="emp-card-image">
                                            <img src={user.picture.imageUrl} alt="" className="img-fluid card-img" />
                                        </div>

                                        <div className="emp-card-details card-body">
                                            <div className="emp-card-head">
                                                <h3 className="card-title text-center mt-3">{user.name}</h3>
                                                <h6 className="card-title text-center mt-2 mb-3">{user.designation}</h6>
                                            </div>
                                            <h6 className="mt-3"><span>Role:</span> {user.role}</h6>
                                            <h6 className="mt-3" style={{ textTransform: 'uppercase' }}><span>Serial No.:</span> {user.serialNo}</h6>
                                            <h6 className="mt-3"><span>Email:</span> {user.email}</h6>
                                            <h6 className="mt-3"><span>Contact No.:</span> {user.phnNum}</h6>
                                            <h6 className="mt-3"><span>Emergency No.:</span> {user.emgPhnNo}</h6>
                                            <h6 className="mt-3" style={{ textTransform: 'capitalize' }}><span>Blood Group:</span> {user.bloodGrp}</h6>
                                            <h6 className="address mt-3" style={{ textTransform: 'capitalize' }}><span>Address:</span> {user.address.address1},<br /> {user.address.address2},<br /> {user.address.state},<br /> {user.address.pincode}</h6>
                                            <h6 className="mt-3"><span>Date of Join:</span> {user.doj}</h6>
                                            <h6 className="mt-3"><span>Salary:</span> {user.salary}</h6>

                                            <div className="emp-nav d-flex justify-content-center mt-3">
                                                <button className="btn nav-btn" onClick={() => editEmployee(user._id)}>
                                                    <i className="fa-solid fa-user-pen"></i>
                                                </button>
                                                <button className="btn nav-btn" onClick={() => removeEmployee(user._id)}>
                                                    <i className="fa-solid fa-user-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* <div className="card shadow">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default AdminProfile