const authControl = require('../Controller/authControl')
const express = require('express')
const authRouter = express.Router()

authRouter.post('/signup', authControl.Signup)

authRouter.post('/signin', authControl.Signin)
//OTP verification for signup
authRouter.post('/verifyotp', authControl.verifyOTP)
//Change password with old password
authRouter.post('/change-pwd/:id', authControl.UserPwdChange)
//Forget password with OTP
authRouter.post('/forget-pwd', authControl.UserForgetPwd)
//Reset Password
authRouter.post('/reset-pwd', authControl.UserResetPwd)
//get user details from employee model
authRouter.get('/userget', authControl.GetUserDetails)
//Edit profile in admin page
authRouter.put('/empedit', authControl.EditProfData)

module.exports = authRouter
