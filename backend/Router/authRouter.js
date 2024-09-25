const authControl = require('../Controller/authControl')
const express = require('express')
const authRouter = express.Router()

authRouter.post('/signup', authControl.Signup)

authRouter.post('/signin', authControl.Signin)

authRouter.post('/verifyotp', authControl.verifyOTP)

module.exports = authRouter
