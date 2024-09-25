import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Assets/CSS/EditEmployee.css'

const EditEmployee = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [previewImg, setPreviewImg] = useState(null)

    const navigate = useNavigate()
    //Fetching single user
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/getuser/${id}`)
            const data = response.data.users
            setUser(data)
            console.log(data);
            setLoading(false)
        } catch (error) {
            console.log('Error in fetching the user details', error);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    //handling file change
    const handleFileChange = (e) => {
        const pic = e.target.files[0]
        setUser({ ...user, picture: pic })
        setPreviewImg(URL.createObjectURL(pic))
    }
    //handling input change
    const handleInputChange = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }
    //handling address input change
    const handleAddressInputChange = (e) => {
        const { value, name } = e.target
        setUser({
            ...user, address: {
                ...user.address, [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            formData.append('name', user.name)
            formData.append('serialNo', user.serialNo)
            formData.append('phnNum', user.phnNum)
            formData.append('emgPhnNo', user.emgPhnNo)
            formData.append('email', user.email)
            formData.append('bloodGrp', user.bloodGrp)
            formData.append('address1', user.address.address1)
            formData.append('address2', user.address.address2)
            formData.append('state', user.address.state)
            formData.append('pincode', user.address.pincode)
            formData.append('doj', user.doj)
            formData.append('designation', user.designation)
            formData.append('role', user.role)
            formData.append('salary', user.salary)
            formData.append('picture', user.picture)

            const response = await axios.put(`http://localhost:4000/updateuser/${id}`, formData)
            const data = response.data
            console.log('Updated user:', data);

            navigate('/employee')
        } catch (error) {
            console.log('Error in editing the user details', error);

        }
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='container editemp-form mt-3 mb-3 p-3'>
            <h1 className='text-center'>Edit Employee Details</h1>
            <form className='mt-3' onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        <h3 className='mt-3 mb-3'>Personal Details</h3>
                    </legend>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Name" value={user.name} name='name' onChange={handleInputChange} />
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Serial Number" value={user.serialNo} name='serialNo' onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="number" className="form-control" placeholder="Contact Number" value={user.phnNum} name='phnNum' onChange={handleInputChange} />
                        </div>

                        <div className="col-md-6">
                            <input type="number" className="form-control" placeholder="Emergency Contact Number" value={user.emgPhnNo} name='emgPhnNo' onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Email" value={user.email} name='email' onChange={handleInputChange} />
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Blood Group" value={user.bloodGrp} name='bloodGrp' onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h3 className='mt-3 mb-3'>Address Details</h3>
                    </legend>

                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" className="form-control" placeholder="Address Line 1" value={user.address.address1} name='address1' onChange={handleAddressInputChange} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" className="form-control" placeholder="Address Line 2" value={user.address.address2} name='address2' onChange={handleAddressInputChange} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="State" value={user.address.state} name='state' onChange={handleAddressInputChange} />
                        </div>

                        <div className="col-md-6">
                            <input type="number" className="form-control" placeholder="Pincode" value={user.address.pincode} name='pincode' onChange={handleAddressInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h3 className='mt-3 mb-3'>Official Details</h3>
                    </legend>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Date of Joining" value={user.doj} name='doj' onChange={handleInputChange} />
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Designation" value={user.designation} name='designation' onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <select className="form-select"
                                value={user.role}
                                name='role'
                                onChange={handleInputChange}>
                                <option value='' disabled>Choose role</option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input type="number" className="form-control" placeholder="Salary" value={user.salary} name='salary' onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h3 className='mt-3 mb-3'>Upload Employee Photo</h3>
                    </legend>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="file" name='picture' className="form-control" onChange={handleFileChange} />

                            {user.picture?.imageUrl ? (
                                <img
                                    src={user.picture.imageUrl}
                                    alt="Employee"
                                    style={{ width: '150px', height: '150px', marginTop: '10px' }}
                                />
                            ) : previewImg ? (
                                <img
                                    src={previewImg}
                                    alt="Employee"
                                    style={{ width: '150px', height: '150px', marginTop: '10px' }}
                                />
                            ) : (
                                <h5 className='mt-3'>
                                    Picture is not available. Please try again later.
                                </h5>
                            )}
                        </div>
                    </div>
                </fieldset>

                <div className='d-flex justify-content-center mt-5 mb-3'>
                    <button className='btn edit-btn w-25'>Edit Employee</button>
                </div>
            </form>
        </div>


        
    )
}

export default EditEmployee