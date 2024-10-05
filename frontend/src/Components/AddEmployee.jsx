import React, { useEffect, useState } from 'react'
import '../Assets/CSS/AddEmployee.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import PreLoader from './PreLoader';

const AddEmployee = () => {
    const [name, setName] = useState('')
    const [serialNo, setSerialNo] = useState('')
    const [phnNum, setPhnNum] = useState('')
    const [emgPhnNo, setEmgPhnNo] = useState('')
    const [email, setEmail] = useState('')
    const [bloodGrp, setBloodGrp] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [doj, setDoj] = useState('')
    const [designation, setDesignation] = useState('')
    const [role, setRole] = useState('')
    const [salary, setSalary] = useState('')
    const [picture, setPicture] = useState(null)
    const [users, setUsers] = useState([])
    const [isAdminExists, setIsAdminExists] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    useEffect(() => {
        const checkAdminExists = async () => {
            try {
                const response = await axios.get('http://localhost:4000/check-admin')
                setIsAdminExists(response.data.adminExists)
            } catch (error) {
                console.log('Error checking admin existence:', error);
            }
        }
        checkAdminExists()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('serialNo', serialNo)
            formData.append('phnNum', phnNum)
            formData.append('emgPhnNo', emgPhnNo)
            formData.append('email', email)
            formData.append('bloodGrp', bloodGrp)
            formData.append('address1', address1)
            formData.append('address2', address2)
            formData.append('state', state)
            formData.append('pincode', pincode)
            formData.append('doj', doj)
            formData.append('designation', designation)
            formData.append('role', role)
            formData.append('salary', salary)
            formData.append('picture', picture)

            for (let item of formData.entries()) {
                console.log(item[0], ':', item[1])
            }

            const response = await axios.post('http://localhost:4000/create', formData)
            const data = response.data
            setUsers(...users, data)
            console.log('New User:', formData)

            notifySuccess(response.data.message || "User added successfully")
            setIsLoading(false)

            setName('')
            setSerialNo('')
            setPhnNum('')
            setEmgPhnNo('')
            setEmail('')
            setBloodGrp('')
            setAddress1('')
            setAddress2('')
            setState('')
            setPincode('')
            setDoj('')
            setDesignation('')
            setRole('')
            setSalary('')
            setPicture('')

            navigate('/employee')

        } catch (error) {
            console.log('Error in adding the new user:', error)
            setIsLoading(false)
            notifyError(error.response?.data.message || "Error on add employee")
        }
    }
    if (isLoading) {
        return <PreLoader/>;
    }

    return (
        <>
            {/* React hot toast  */}
            <Toaster position="top-right" reverseOrder={false} />
            <div className='container addemp-form col-sm-8 mt-3 mb-3 p-3'>
                <h1 className='text-center'>Add Employee Details</h1>
                <form className='mt-3' onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Personal Details</h3>
                        </legend>
                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Serial Number" value={serialNo} onChange={(e) => setSerialNo(e.target.value)} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Contact Number" value={phnNum} onChange={(e) => setPhnNum(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Emergency Contact Number" value={emgPhnNo} onChange={(e) => setEmgPhnNo(e.target.value)} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Blood Group" value={bloodGrp} onChange={(e) => setBloodGrp(e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Address Details</h3>
                        </legend>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <input type="text" className="form-control" placeholder="Address Line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <input type="text" className="form-control" placeholder="Address Line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Official Details</h3>
                        </legend>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Date of Joining" value={doj} onChange={(e) => setDoj(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <select className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}>
                                    <option value='' disabled>Choose role</option>
                                    <option value="Admin" disabled={isAdminExists}>Admin</option>
                                    <option value="Employee" className='select-options'>Employee</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Upload Employee Photo</h3>
                        </legend>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <input type="file" className="form-control" onChange={(e) => setPicture(e.target.files[0])} />
                            </div>
                        </div>
                    </fieldset>

                    <div className='d-flex justify-content-center mt-5 mb-3'>
                        <button className='btn add-btn'>Add Employee</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEmployee