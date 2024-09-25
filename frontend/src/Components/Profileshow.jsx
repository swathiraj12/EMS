import React from 'react'
import Modal from 'react-bootstrap/Modal';
import myProfilePic from '../Assets/Images/profile1.jpg'
import { useAuth } from '../Context/ContextAuth';
import '../Assets/CSS/Profileshow.css'

let Profileshow = (props) => {
    const { user } = useAuth()
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
                                <h3 className="text-center mb-2 empCardTitle">My Profile</h3>
                                <img src={myProfilePic}
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
                                <input type="text" className='form-control profViewInput' readOnly value={user?.name || 'username'} style={{ cursor: 'no-drop' }} />

                                <label className='form-label profViewLabel mt-3 mb-3'>Email ID :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={user?.email || 'email id'} style={{ cursor: 'no-drop' }} />
                            </div>
                            <div className="col-lg-6">
                                <label className='form-label profViewLabel mt-3 mb-3'>Designation :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={user.designation || 'designation'} style={{ cursor: 'no-drop' }} />

                                <label className='form-label profViewLabel mt-3 mb-3'>Password :</label>
                                <input type="text" className='form-control profViewInput' readOnly value={user?.password || '**********'} style={{ cursor: 'no-drop' }} />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Profileshow