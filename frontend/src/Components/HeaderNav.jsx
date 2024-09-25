import React from 'react'
import { useAuth } from '../Context/ContextAuth'
import { useLocation } from 'react-router-dom'
import profilePic from '../Assets/Images/profile1.jpg'
import '../Assets/CSS/HeaderNav.css'
import Profileshow from './Profileshow'
import ProfileEdit from './ProfileEdit'

const HeaderNav = () => {
    const { user, signout } = useAuth()
    const location = useLocation()
    const [profileShow, setProfileShow] = React.useState(false);
    const [profileEdit, setProfileEdit] = React.useState(false);

    const getPageName = () => {
        const path = location.pathname
        switch (path) {
            case '/':
                return 'DASHBOARD'
            case '/addemp':
                return 'ADD EMPLOYEE'
            case '/employee':
                return 'EMPLOYEE LIST'
            // case '/editemp':
            //     return 'EDIT EMPLOYEE DETAILS'
            default:
                return 'EDIT EMPLOYEE DETAILS'
        }
    }
    return (
        <header className='container-fluid admin-header p-3'>
            <div className="row">

                <div className="col-lg-6 align-content-center">
                    <h3 className='page-name'>{getPageName()}</h3>
                </div>

                <div className="col-lg-6">
                    <div className="user-info d-flex justify-content-end">
                        <div className="dropdownSetting me-3">
                            <button className='btn dropdown-toggle' type='button' id='settingsDropdown' data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-gear" style={{ color: '#694f8e' }}></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="settingsDropdown">

                                <li className="dropdown-item" onClick={() => setProfileShow(true)}>My Profile</li>
                                
                                <li className="dropdown-item" onClick={() => setProfileShow(true)}>Edit Profile</li>
                                
                                <li className="dropdown-item" onClick={signout}>Sign out</li>

                            </ul>
                        </div>

                        {/* Welcome Note and User's Name */}
                        <div className="welcome-note">
                            <span>Hi, {user?.role} {user?.name}!</span>
                        </div>

                        {/* User's Profile Picture */}
                        <div className="user-profile-picture ms-3">
                            <img
                                src={user?.picture || profilePic}
                                alt={`${user?.name}'s profile`}
                                className="img-fluid rounded-circle"
                                style={{ width: '45px', height: '45px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Profileshow
                show={profileShow}
                onHide={() => setProfileShow(false)}
            />

            <ProfileEdit
                show={profileEdit}
                onHide={() => setProfileEdit(false)}
            />
        </header>
    )
}

export default HeaderNav