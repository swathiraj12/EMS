import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../Assets/CSS/NavBar.css'
import { useAuth } from '../Context/ContextAuth';
import HeaderNav from './HeaderNav';

const NavBar = ({ children }) => {
    const { user, signout } = useAuth()
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 992)
    }

    useEffect(() => {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className={`container sidebar m-0 p-0 col-md-2 ${isSmallScreen ? 'icon-only' : ''}`}>

                    {!isSmallScreen && <h1 className='logo text-center mt-3'>ems</h1>}
                    {!isSmallScreen && <h2 className='panel-heading text-center'>Admin Panel</h2>}

                    <ul>
                        <li className='p-2 m-1'>
                            <NavLink to='/' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>
                                <span><i className="fa-solid fa-house"></i></span>
                                {!isSmallScreen && <span> Dashboard</span>}
                            </NavLink>
                        </li>

                        {/* Admin only links */}
                        {user?.role === 'Admin' && (
                            <>
                                <li className='p-2 m-1'>
                                    <NavLink to='/addemp' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>
                                        <span><i class="fa-solid fa-user-plus"></i></span>
                                        {!isSmallScreen && <span> Add Employee</span>}
                                    </NavLink>
                                </li>
                                <li className='p-2 m-1'>
                                    <NavLink to='/employee' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>
                                        <span><i className="fa-solid fa-users-line"></i></span> {!isSmallScreen && <span> Employee List</span>}
                                    </NavLink>
                                </li>
                                <li className='p-2 m-1'>
                                    <NavLink to='/admindetails' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>
                                        <span><i class="fa-solid fa-user-tie"></i></span>
                                        {!isSmallScreen && <span> Add My Details</span>}
                                    </NavLink>
                                </li>
                                <li className='p-2 m-1'>
                                    <NavLink to='/admin' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>
                                        <span><i class="fa-brands fa-black-tie"></i></span>
                                        {!isSmallScreen && <span> My Profile</span>}
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Employee only links */}
                        {user?.role === 'Employee' && (
                            <>
                                <li className='p-2 m-1'>
                                    <NavLink to='/empdetails/id' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}> <span><i className="fa-solid fa-circle-info"></i></span>
                                        {!isSmallScreen && <span> My Details</span>}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* Common links */}
                    <div className='btn-sec d-flex justify-content-center'>
                        <button className='btn w-75 mb-5 signoutBtn' onClick={signout}> <span><i className="fa-solid fa-right-from-bracket"></i></span>
                            {!isSmallScreen && <span> Sign out</span>}</button>
                    </div>
                </div>

                <div className="col-2"></div>

                <div className="col-md-10 col-12 ps-3">
                    <HeaderNav />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default NavBar