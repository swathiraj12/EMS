import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Assets/CSS/EditEmployee.css'
import PreLoader from './PreLoader'

const EditEmployee = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [previewImg, setPreviewImg] = useState(null)

    const navigate = useNavigate()
    //Fetching single user
    const fetchUser = async () => {
        console.log(id);

        try {
            const response = await axios.get(`http://localhost:4000/getuserbyid/${id}`)
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

            // Conditional navigation based on user role
            if (user?.role === 'Admin') {
                navigate('/admin')
            } else {
                navigate('/employee')
            }
        } catch (error) {
            console.log('Error in editing the user details', error);
        }
    }

    if (loading) {
        return < PreLoader />;
    }

    return (
        <>
            <h1 className='page-name text-center mx-5 mt-3 mb-5' style={{textTransform:'uppercase'}}>Edit Employee Details</h1>

            <div className='container editemp-form mt-3 mb-3 p-3'>
                <h1 className='text-center'>Edit Employee Details</h1>
                <form className='mt-3' onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Personal Details</h3>
                        </legend>
                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Name :</label>
                                <input type="text" className="form-control" value={user.name} name='name' onChange={handleInputChange} />
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Serial Number :</label>
                                <input type="text" className="form-control" value={user.serialNo} name='serialNo' onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Contact Number :</label>
                                <input type="number" className="form-control" value={user.phnNum} name='phnNum' onChange={handleInputChange} />
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Emergency Contact Number :</label>
                                <input type="number" className="form-control" value={user.emgPhnNo} name='emgPhnNo' onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Email :</label>
                                <input type="email" className="form-control" value={user.email} name='email' onChange={handleInputChange} />
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Blood Group :</label>
                                <input type="text" className="form-control" value={user.bloodGrp} name='bloodGrp' onChange={handleInputChange} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Address Details</h3>
                        </legend>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className='form-label profViewLabel'>Address Line 1 :</label>
                                <input type="text" className="form-control" value={user.address.address1} name='address1' onChange={handleAddressInputChange} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className='form-label profViewLabel'>Address Line 2 :</label>
                                <input type="text" className="form-control" value={user.address.address2} name='address2' onChange={handleAddressInputChange} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>State :</label>
                                <input type="text" className="form-control" value={user.address.state} name='state' onChange={handleAddressInputChange} />
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Pincode :</label>
                                <input type="number" className="form-control" value={user.address.pincode} name='pincode' onChange={handleAddressInputChange} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h3 className='mt-3 mb-3'>Official Details</h3>
                        </legend>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Date of Joining :</label>
                                <input type="text" className="form-control" value={user.doj} name='doj' onChange={handleInputChange} />
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Designation :</label>
                                <input type="text" className="form-control" value={user.designation} name='designation' onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="row gy-2 mt-3">
                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Role :</label>
                                <select readOnly className="form-select"
                                    value={user.role}
                                    name='role'
                                    onChange={handleInputChange}>
                                    <option value='' disabled>Choose role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className='form-label profViewLabel'>Salary :</label>
                                <input type="number" className="form-control" value={user.salary} name='salary' onChange={handleInputChange} />
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
                        <button className='btn edit-btn'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </>


    )
}

export default EditEmployee