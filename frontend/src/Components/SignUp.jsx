import React, { useState } from 'react'
import axios from 'axios'
import '../Assets/CSS/SignUp.css'
import signupImg from '../Assets/Images/signup.jpg'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [role, setRole] = useState('')
    const [otp, setOtp] = useState(0)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    // Hot toast notification
    // Success notification
    const notifySuccess = (msg) =>
        toast.success(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });

    // Error notification
    const notifyError = (msg) =>
        toast.error(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });

    //Validation
    const validateForm = () => {
        const newErrors = {};
        const pwdRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!pwdRegex.test(password)) {
            newErrors.password = 'Password must be at least 6 characters, contain one uppercase letter, one number, and one special character';
        }

        if (!confirmPwd) {
            newErrors.confirmPwd = 'Please confirm your password';
        } else if (password !== confirmPwd) {
            newErrors.confirmPwd = 'Passwords do not match';
        }

        if (!role) {
            newErrors.role = 'Role is required';
        }

        if (role !== 'Employee' && !name) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Function for sending OTP
    const sendOtp = async () => {
        if (!validateForm()) return
        try {
            const response = await axios.post('http://localhost:4000/signup', {
                name,
                email,
                password,
                confirmPwd,
                role
            })
            if (response.status === 201) {
                setIsOtpSent(true)
                console.log('OTP sent successfully');
            }
        } catch (error) {
            console.log('Failed to send OTP', error);
            notifyError(error.response.data.message || "error in sign-up")
        }
    }

    //Function for the verification of sent OTP
    const verifyOtp = async (e) => {
        e.preventDefault()

        console.log('Entered OTP:', otp)
        const otpNum = parseInt(otp)
        // console.log(typeof (otpNum));

        try {
            const response = await axios.post('http://localhost:4000/verifyotp', {
                email,
                otp: otpNum
            })
            if (response.status === 200) {
                notifySuccess("OTP Verified")
                setIsVerified(true)
            }
            navigate('/signin')
        } catch (error) {
            setIsVerified(false)
            console.log('Invalid OTP or OTP expired', error);
        }
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='container sign-up d-flex justify-content-center p-5 my-5 bg-light'>
                <div className="row">
                    <div className="col-lg-6 col-md-12 p-3">
                        <form className='sign-up-form'>
                            <h1 className='text-center'>ems</h1>
                            <h2 className='text-center'>Sign Up</h2>
                            <p className='text-center'>"A secure login is the first step to protecting your digital world"</p>

                            {role !== 'Employee' && (
                                <>
                                    <label className='form-label mt-3 mb-3'>Name:</label>
                                    <input type="text"
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <p className="error-text text-danger">{errors.name}</p>}
                                </>
                            )}

                            <label className='form-label mt-3 mb-3'>Email:</label>
                            <input type="email"
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="error-text text-danger">{errors.email}</p>}

                            <label className='form-label mt-3 mb-3'>Password:</label>
                            <input type="password"
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p className="error-text text-danger">{errors.password}</p>}

                            <label className='form-label mt-3 mb-3'>Confirm Password:</label>
                            <input type="password"
                                className='form-control'
                                value={confirmPwd}
                                onChange={(e) => setConfirmPwd(e.target.value)} />
                            {errors.confirmPwd && <p className="error-text text-danger">{errors.confirmPwd}</p>}

                            <label className='form-label mt-3 mb-3'>Role:</label>
                            <select className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}>
                                <option value='' disabled>Choose role</option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                            {errors.role && <p className="error-text text-danger">{errors.role}</p>}

                            <div className='d-flex flex-column justify-content-center'>
                                {
                                    !isOtpSent ? (
                                        <button type='button' className='genOtpBtn mt-3 mb-3' onClick={sendOtp}>Generate OTP</button>
                                    ) : (
                                        <>
                                            <label className='form-label mt-3 mb-3'>Enter OTP:</label>
                                            <input type="number"
                                                className='form-control'
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)} />

                                            <button type='button' className='genOtpBtn mt-3 mb-3' onClick={verifyOtp}>Verify OTP and Sign up</button>
                                        </>
                                    )
                                }
                            </div>

                            <p className='mt-3'>Already have an account? <a href="/signin">Sign in here</a></p>

                        </form>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <img src={signupImg} alt="" className='img-fluid sign-up-img' />
                    </div>
                </div>

            </div>
        </>

    )
}

export default SignUp