import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import myProfilePic from '../Assets/Images/profile1.jpg'
import { useAuth } from '../Context/ContextAuth';
import '../Assets/CSS/ProfileshowEdit.css'
import axios from 'axios';

let Profileshow = (props) => {
    const { user } = useAuth()
    const [users, setUsers] = useState({})

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
                                <h2 className="text-center mb-2 empCardTitle">My Profile</h2>
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

                        <div className="row mb-4">
                            <div className="col-lg-6">
                                <label className='form-label profViewLabel mt-3 mb-3'>Name :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={users?.name || 'username'} style={{ cursor: 'no-drop', textTransform: 'capitalize' }} />

                                <label className='form-label profViewLabel mt-3 mb-3'>Email ID :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={users?.email || 'email id'} style={{ cursor: 'no-drop' }} />
                            </div>
                            <div className="col-lg-6">
                                <label className='form-label profViewLabel mt-3 mb-3'>Designation :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={users.designation || 'designation'} style={{ cursor: 'no-drop', textTransform: 'capitalize' }} />

                                <label className='form-label profViewLabel mt-3 mb-3'>Password :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={'**********'} style={{ cursor: 'no-drop' }} />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Profileshow