import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import myProfilePic from '../Assets/Images/profile1.jpg'
import { useAuth } from '../Context/ContextAuth';
import '../Assets/CSS/ProfileshowEdit.css'
import axios from 'axios'

const ChangePwd = (props) => {
    const { user } = useAuth()
    
    const [changePwdMode, setChangePwdMode] = useState(false)
    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')

    const [users, setUsers] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const pwdRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    const fetchUserDetails = async () => {
        try {

            const response = await axios.get(`http://localhost:4000/userget/${user.email}`)
            if (response.data && response.data.userDetails) {
                setUsers(response.data.userDetails)
                // console.log('Fetched user details:', response.data.userDetails)
            } else {
                console.error('No user details found in response')
            }

        } catch (error) {
            console.log('Error in fetching the users', error);
        }
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])

    //Validate passwords
    const validatePasswords = () => {
        if (!oldPwd) {
            setErrorMessage('Old password is required');
            return false;
        }

        if (!newPwd) {
            setErrorMessage('New password is required');
            return false;
        }

        if (!pwdRegex.test(newPwd)) {
            setErrorMessage('New password must be at least 6 characters long, include one uppercase letter, one number, and one special character');
            return false;
        }

        if (newPwd !== confirmPwd) {
            setErrorMessage('New password and confirmation password do not match');
            return false;
        }

        setErrorMessage('');
        return true;
    }

    const handlePwdChange = async () => {
        if (!validatePasswords()) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/change-pwd/${user.id}`, {
                oldPwd,
                newPwd
            })
            console.log(response);

            setOldPwd('')
            setNewPwd('')
            setConfirmPwd('')

            alert('Password changer successfully!')
            setChangePwdMode(false)
        } catch (error) {
            console.log(error.response?.data?.message || 'Something went wrong');
            alert('Something went wrong')

        }
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="d-flex flex-column align-items-center">
                                <h2 className="text-center mb-2 empCardTitle">Change Password</h2>
                                <img src={users?.picture || myProfilePic}
                                    className="img-fluid rounded-circle"
                                    style={{
                                        height: "150px",
                                        width: "150px",
                                        objectFit: "cover",
                                        border: '2px solid #694F8E'
                                    }}
                                    alt="Profile Pic" />
                                <h3 className='text-center empCardRole mt-2 mb-2'>{user?.role}</h3>
                            </div>
                        </div>

                        {
                            !changePwdMode ? (
                                <div className="row mb-4 d-flex justify-content-center">
                                    <div className="col-lg-4 d-flex flex-column justify-content-center">
                                        <label className='form-label profViewLabel text-center mt-3 mb-3'>Password</label>
                                        <input type="text" className='form-control profViewInput' readOnly value={'**********'} style={{ cursor: 'no-drop' }} />

                                        <div className='mt-3 d-flex justify-content-center'>
                                            <button className='btn changePwdBtn' onClick={()=>setChangePwdMode(true)}>Change Password</button>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                    <div className="row mb-4 d-flex justify-content-center">
                                        <div className="col-lg-6 d-flex flex-column">
                                            <label className='form-label profViewLabel mt-3'>Old Password</label>
                                            <input
                                                type="password"
                                                className='form-control profViewInput'
                                                value={oldPwd}
                                                onChange={(e) => setOldPwd(e.target.value)}
                                            />

                                            <label className='form-label profViewLabel mt-3'>New Password</label>
                                            <input
                                                type="password"
                                                className='form-control profViewInput'
                                                value={newPwd}
                                                onChange={(e) => setNewPwd(e.target.value)}
                                            />

                                            <label className='form-label profViewLabel mt-3'>Confirm New Password</label>
                                            <input
                                                type="password"
                                                className='form-control profViewInput'
                                                value={confirmPwd}
                                                onChange={(e) => setConfirmPwd(e.target.value)}
                                            />

                                            {errorMessage && (
                                                <div className="alert alert-danger mt-3" role="alert">
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <div className='mt-4 d-flex justify-content-evenly'>
                                                <button className='btn changePwdBtn' onClick={handlePwdChange}>
                                                    Submit
                                                </button>
                                                <button
                                                    className='btn btn-secondary ml-3'
                                                    onClick={() => setChangePwdMode(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
                        
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ChangePwd