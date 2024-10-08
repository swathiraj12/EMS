import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/ContextAuth'
import { useLocation } from 'react-router-dom'
import profilePic from '../Assets/Images/profile1.jpg'
import '../Assets/CSS/HeaderNav.css'
import ChangePwd from './ChangePwd'
import axios from 'axios'
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderNav = ({ handleShowSidebar }) => {
    const [users, setUsers] = useState({})

    const { user, signout } = useAuth()
    const location = useLocation()
    //States for model
    const [changePwd, setChangePwd] = React.useState(false);
    //Function to get the path
    const getPageName = () => {
        const path = location.pathname
        switch (path) {
            case '/':
                return 'DASHBOARD'
            case '/addemp':
                return 'ADD EMPLOYEE'
            case '/employee':
                return 'EMPLOYEES LIST'
            case '/admin':
                return 'MY PROFILE'
            case '/empdetails/:id':
                return 'MY PROFILE DETAILS'
            case '/mail-send':
                return 'MAIL SENDER'
            case '/indivimail-send/id':
                return 'INDIVIDUAL MAIL SENDER'
            default:
                return ''
        }
    }
    //Function to fetch user details by email
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
        <header className='container admin-header p-3'>
            <div className="row">

                <div className="col-md-6 col-12 d-flex align-content-center">
                    <h3 className='page-name'>{getPageName()}</h3>
                    {/* Call to action button - menu toggle */}
                    <div className=' text-end p-3 '><span className='sidebar-icon px-2 rounded-2' onClick={handleShowSidebar}><GiHamburgerMenu /></span></div>
                </div>

                <div className="col-md-6 col-12">
                    <div className="user-info d-flex justify-content-center">
                        {/* conditional rendering based on role */}
                        {user?.role === 'Employee' ?
                            <div className="dropdownSetting me-3">
                                <button className='btn dropdown-toggle' type='button' id='settingsDropdown' data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-gear" style={{ color: '#694f8e' }}></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="settingsDropdown">

                                    <li className="dropdown-item" onClick={() => setChangePwd(true)}> <span><i className="fa-solid fa-lock"></i></span> Change Password</li>

                                    <li className="dropdown-item" onClick={signout}> <span><i className="fa-solid fa-right-from-bracket"></i></span> Sign out</li>

                                </ul>
                            </div>
                            :
                            <div className="icon-only me-3">
                                <button className='btn signout-btn' type='button' onClick={signout}>
                                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                                    <span>Sign out</span>
                                </button>
                            </div>
                        }
                        {/* Welcome Note and User's Name */}
                        <div className="welcome-note">
                            <span>Hi, {user?.role} {users?.name}!</span>
                        </div>
                        {/* User's Profile Picture */}
                        {user?.role !== 'Admin' && (
                            <div className="user-profile-picture ms-2">
                                <img
                                    src={users?.picture || profilePic}
                                    alt={`${user?.name || user}'s profile`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: '45px', height: '45px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Model for password change */}
            <ChangePwd
                show={changePwd}
                onHide={() => setChangePwd(false)}
            />
        </header>
    )
}
export default HeaderNav