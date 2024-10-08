import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Assets/CSS/ViewEmployee.css'
import axios from 'axios'
import cover from '../Assets/Images/cardcover.jpg'
import toast, { Toaster } from "react-hot-toast";

const ViewEmployee = () => {
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
    //Function to fetch all users
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getusers')
            setUsers(response.data.users)
            console.log(response.data.users);

        } catch (error) {
            console.log('Error in fetching the users', error);
            notifyError("Error on server")
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])
    //Function to remove a user
    const removeEmployee = async (_id) => {
        await axios.delete(`http://localhost:4000/deluser/${_id}`)
        fetchEmployees()
        notifySuccess('User removed')
    }
    //Function to update a user
    const editEmployee = (_id) => {
        console.log('Id:', _id);
        navigate(`/editemp/${_id}`)
    }
    //Function to send mail
    const handleMailClick = (_id) => {
        // console.log('Id:', _id);
        navigate(`/indivimail-send/${_id}`)
    }
    return (
        <>
            {/* React hot toast  */}
            <Toaster position="top-right" reverseOrder={false} />
            <div className="container view-emp">
                <div className="row d-flex justify-content-center">
                    {/* Filter method to fetch employee role alone and map method to fetch the details */}
                    <div className='view-emp-display'>
                        {users
                            .filter(user => user.role !== 'Admin')
                            .map((user) => (
                                <div className="card shadow emp-card mt-5 mb-3" key={user._id} style={{ maxWidth: '400px' }}>
                                    <div className="card-body">
                                        <div style={{ position: 'relative', height: '150px', overflow: 'visible' }}>

                                            <img src={cover} alt="Cover" className="img-fluid" style={{ height: "200px", width: "100%" }} />

                                            <img src={user.picture?.imageUrl} alt="Profile" className="img-fluid rounded-circle" style={{ height: "100px", width: "100px", position: "absolute", bottom: "-90px", left: "50%", transform: "translateX(-50%)" }} />
                                        </div>

                                        <div className="row mt-5">
                                            <h2 className="text-center fw-semibold text-uppercase mt-5" style={{ color: '#694F8E' }}>{user.name} <span className="text-secondary text-capitalize fs-6">({user.role})</span></h2>
                                            <h5 className="text-center text-secondary text-capitalize">{user.designation}</h5>
                                            <h6 className="text-center text-secondary text-uppercase">({user.serialNo})</h6>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">

                                                <div className='row'>
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Address :</label>
                                                    <h5 className="fw-normal card-detail address col-md-12 col-sm-8">
                                                        {user.address?.address1},
                                                        <br /> {user.address?.address2},<br /> {user.address?.state},
                                                        <br /> {user.address?.pincode}</h5>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Contact No. :</label>
                                                    <h5 className="fw-normal card-detail col-md-12 col-sm-8">{user.phnNum}</h5>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Emergency Contact No. :</label>
                                                    <h5 className="fw-normal card-detail col-md-12 col-sm-8">{user.emgPhnNo}</h5>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Email :</label>
                                                    <h5 className="fw-normal card-detail col-md-12 col-sm-8">{user.email}</h5>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">DOJ :</label>
                                                    <h5 className="fw-normal card-detail col-md-12 col-sm-8">{user.doj}</h5>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Salary :</label>
                                                    <h5 className="fw-normal card-detail col-md-12 col-sm-8">{user.salary}</h5>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="form-label fw-bold card-label col-md-12 col-sm-4">Blood Group :</label>
                                                    <h5 className="fw-normal card-detail text-capitalize col-md-12 col-sm-8">{user.bloodGrp}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Call to action button - Remove, update and send mail */}
                                        <div className="d-flex justify-content-center mt-3">

                                            <button className="btn nav-btn" onClick={() => removeEmployee(user._id)}>
                                                <i className="fa-solid fa-user-xmark"></i>
                                            </button>

                                            <button className="btn nav-btn" onClick={() => editEmployee(user._id)}>
                                                <i className="fa-solid fa-user-pen"></i>
                                            </button>

                                            <button className="btn nav-btn" onClick={() => handleMailClick(user._id)}>
                                                <i className="fa-solid fa-envelope-circle-check"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewEmployee