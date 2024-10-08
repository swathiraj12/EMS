import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../Assets/CSS/NavBar.css'
import { useAuth } from '../Context/ContextAuth';
import HeaderNav from './HeaderNav';
import axios from 'axios';

const NavBar = ({ children }) => {
    const { user, signout } = useAuth()
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [sidebarShow, setSidebarShow] = useState(false)
    
    const [users, setUsers] = useState({})
    //Function to fetch user details by email
    const fetchUserDetails = async () => {
        try {

            const response = await axios.get(`http://localhost:4000/userget/${user.email}`)
            if (response.data && response.data.userDetails) {
                setUsers(response.data.userDetails)
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
    //Function to check screen size
    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 992)
    }
    useEffect(() => {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])
    //Function to handle sidebar
    const handleShowSidebar = () => {
        setSidebarShow(!sidebarShow)
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className={`container ${sidebarShow && "sidebar-open"} sidebar m-0 p-0 col-md-2 ${isSmallScreen ? 'icon-only' : ''}`}>

                    {!isSmallScreen && <h1 className='logo text-center mt-3'>ems</h1>}
                    {!isSmallScreen && <h2 className='panel-heading text-center'>Admin Panel</h2>}

                    <ul>
                        <li className='p-2 m-1'>
                            <NavLink to='/' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}>
                                <span><i className="fa-solid fa-house me-2"></i></span>
                                {!isSmallScreen && <span> Dashboard</span>}
                            </NavLink>
                        </li>

                        {/* Admin only links */}
                        {user?.role === 'Admin' && (
                            <>
                                <li className='p-2 m-1'>
                                    <NavLink to='/addemp' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}>
                                        <span><i className="fa-solid fa-user-plus me-2"></i></span>
                                        {!isSmallScreen && <span> Add Employee</span>}
                                    </NavLink>
                                </li>
                                <li className='p-2 m-1'>
                                    <NavLink to='/employee' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}>
                                        <span><i className="fa-solid fa-users-line me-2"></i></span> {!isSmallScreen && <span> Employee List</span>}
                                    </NavLink>
                                </li>
                                
                                <li className='p-2 m-1'>
                                    <NavLink to='/admin' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}>
                                        <span><i className="fa-brands fa-black-tie me-2"></i></span>
                                        {!isSmallScreen && <span> My Profile</span>}
                                    </NavLink>
                                </li>
                                <li className='p-2 m-1'>
                                    <NavLink to='/mail-send' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}>
                                        <span><i className="fa-solid fa-envelope me-2"></i></span>
                                        {!isSmallScreen && <span> Mail Sender</span>}
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* Employee only links */}
                        {user?.role === 'Employee' && (
                            <>
                                <li className='p-2 m-1'>
                                    <NavLink to='/empdetails/:email' className={({ isActive }) => `p-3 ${isActive ? 'active-link' : ''}`}> <span><i className="fa-solid fa-circle-info me-2"></i></span>
                                        {!isSmallScreen && <span> My Details</span>}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* Common link */}
                    <div className='btn-sec d-flex justify-content-center'>
                        <button className='btn mb-5 signoutBtn' onClick={signout}> <span><i className="fa-solid fa-right-from-bracket"></i></span>
                            {!isSmallScreen && <span> Sign out</span>}</button>
                    </div>
                </div>

                <div className="col-sm-2 col-2"></div>

                <div className="col-md-10 col-sm-10 col-12 ps-3">
                    <HeaderNav handleShowSidebar={handleShowSidebar} />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default NavBar