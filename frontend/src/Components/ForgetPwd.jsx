import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../Assets/CSS/ForgetPwd.css'

const ForgetPwd = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [otp, setOtp] = useState(0)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate()

    //Function for OTP
    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:4000/forget-pwd', { email })

            if (response.status === 200) {
                setIsOtpSent(true)
                setSuccessMessage('OTP sent successfully');
                setErrorMessage('');
            }
        } catch (error) {
            console.log('Failed to send OTP', error);
            setErrorMessage('Failed to send OTP. Please try again.');
        }
    }

    //Function for the verification of sent OTP
    const verifyOtp = async (e) => {
        e.preventDefault()

        console.log('Entered OTP:', otp)
        const otpNum = parseInt(otp)
        console.log(typeof (otpNum));

        try {
            const response = await axios.post('http://localhost:4000/verifyotp', {
                email,
                otp: otpNum
            })
            if (response.status === 200) {
                setIsVerified(true)
                setSuccessMessage('OTP verified successfully');
                setErrorMessage('');
            }
        } catch (error) {
            setIsVerified(false)
            setErrorMessage('Invalid OTP or OTP expired. Please try again.');
            console.log('Invalid OTP or OTP expired', error);
        }
    }

    //Function to reset password
    const handleResetPwd = async (e) => {
        e.preventDefault()

        if (password !== confirmPwd) {
            setErrorMessage('Passwords do not match')
            return
        }

        try {
            const response = await axios.post('http://localhost:4000/reset-pwd', { email, newPwd: password })

            if (response.status === 200) {
                setSuccessMessage('Password reset successful')
                setErrorMessage('')
                alert('Password reset successful')
                props.onHide()
            }

            setEmail('')
            setPassword('')
            setConfirmPwd('')

            navigate('/signin')

        } catch (error) {
            setErrorMessage('Error in resetting password. Please try again')
            console.log('Password reset error:', error);
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
                        <div className="d-flex flex-column align-items-center">
                            <h2 className="text-center mb-2 empCardTitle">Forgot Password</h2>
                        </div>

                        <div className="row mb-4 d-flex justify-content-center">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <label className='form-label profViewLabel text-center mt-3 mb-3'>Enter your Email Address</label>
                                <input type="email" className='form-control profViewInput' value={email} onChange={(e) => setEmail(e.target.value)} />

                                <div className='mt-3 d-flex justify-content-center'>
                                    {
                                        !isOtpSent ? (
                                            <button className='btn changePwdBtn' onClick={sendOtp}>Generate OTP</button>
                                        ) : !isVerified ? (
                                            <>
                                                <div>
                                                    <label className='form-label text-start mt-3 mb-3'>Enter OTP:</label>
                                                    <input type="number"
                                                        className='form-control'
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)} />

                                                    <div className='mt-3 d-flex justify-content-center'>
                                                        <button type='button' className='btn changePwdBtn' onClick={verifyOtp}>Verify OTP</button>
                                                    </div>
                                                </div>

                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className='form-label mt-3 mb-3'>Password:</label>
                                                    <input type="password"
                                                        className='form-control'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />

                                                    <label className='form-label mt-3 mb-3'>Confirm Password:</label>
                                                    <input type="password"
                                                        className='form-control'
                                                        value={confirmPwd}
                                                        onChange={(e) => setConfirmPwd(e.target.value)} />

                                                            <div className='mt-3 d-flex justify-content-center'>
                                                                <button className="changePwdBtn btn" onClick={handleResetPwd} type="submit">
                                                            Reset Password
                                                        </button>
                                                    </div>
                                                </div>

                                            </>
                                        )
                                    }

                                </div>
                            </div>

                            <div>
                                {errorMessage && (
                                    <div className="alert alert-danger mt-3 mb-3" role="alert">
                                        {errorMessage}
                                    </div>
                                )}

                                {successMessage && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ForgetPwd