import React, { useState } from 'react'
import '../Assets/CSS/SignIn.css'
import signinImg from '../Assets/Images/signin.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/ContextAuth'
import ForgetPwd from './ForgetPwd'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const [forgetPwd, setForgetPwd] = React.useState(false);

    const navigate = useNavigate()
    const authContext = useAuth()

    //Function for handling sign-in
    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/signin', {
                email,
                password
            })
            console.log(response);


            const token = response.data.token

            authContext.signin(token)
            localStorage.setItem('token', token)

            // alert('Signed in successfully!');

            setEmail('');
            setPassword('');
            setErrorMessage('');

            navigate('/')

        } catch (error) {
            setErrorMessage('Invalid credentials or server error.')
            console.log('Error in sign in', error);
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className='container sign-in d-flex justify-content-center p-5 my-5 bg-light'>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 p-3">
                            <form className='sign-in-form' onSubmit={handleSignIn}>
                                <h1 className='text-center'>swathi</h1>
                                <h2 className='text-center'>Sign In</h2>
                                <p className='text-center'>"Access your account to continue"</p>

                                <label className='form-label mt-3 mb-3'>Email:</label>
                                <input type="email"
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <label className='form-label mt-3 mb-3'>Password:</label>
                                <input type="password"
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <h6 className='text-end d-block mt-1 mb-3' onClick={() => setForgetPwd(true)}>Forgot Password?</h6>

                                {errorMessage && (
                                    <div className="alert alert-danger mt-3 mb-3" role="alert">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className='d-flex flex-column justify-content-center mt-3'>
                                    <button type="submit" className='signInBtn mt-3 mb-3 '>Sign In</button>

                                    <p className='mt-3'>don't have an account? <a href="/signup">Sign up Now</a></p>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <img src={signinImg} alt="" className='img-fluid sign-in-img' />
                        </div>
                    </div>
                </div>
            </div>

            <ForgetPwd
                show={forgetPwd}
                onHide={() => setForgetPwd(false)}
            />
        </>
    )
}

export default SignIn