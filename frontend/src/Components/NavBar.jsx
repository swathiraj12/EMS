import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../Assets/CSS/NavBar.css'
import { useAuth } from '../Context/ContextAuth';
import HeaderNav from './HeaderNav';

const NavBar = ({ children }) => {
    const { user, signout } = useAuth()

    return (
        <div className=' container-fluid'>
            <div className='row'>
                <div className="container sidebar m-0 p-0 col-md-2">
                    <h1 className='logo text-center mt-3'>ems</h1>
                    <h2 className='panel-heading text-center'>Admin Panel</h2>
    
                    <ul>
                        <li className='p-3 m-3'>
                            <NavLink to='/' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>Dashboard</NavLink>
                        </li>
    
                        {/* Admin only links */}
                        {user?.role === 'Admin' && (
                            <>
                                <li className='p-3 m-3'>
                                    <NavLink to='/addemp' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>Add Employee</NavLink>
                                </li>
                                <li className='p-3 m-3'>
                                    <NavLink to='/employee' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>Employee List</NavLink>
                                </li>
                            </>
                        )}
    
                        {/* Employee only links */}
                        {user?.role === 'Employee' && (
                            <>
                                <li className='p-3 m-3'>
                                    <NavLink to='/' className={({ isActive }) => `p-3 text-center ${isActive ? 'active-link' : ''}`}>Home</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* Common links */}
                    <div className='btn-sec d-flex justify-content-center'>
                        <button className='btn w-75 mb-5 signoutBtn' onClick={signout}>Sign out</button>
                    </div>
                </div>
    
                <div className="col-2"></div>
    
                <div className="col-md-10 col-12 ps-3">
                    <HeaderNav />
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default NavBar