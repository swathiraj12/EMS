const authModel = require('../Model/authModel')
const empModel = require('../Model/empModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const otpGen = require('otp-generator')

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.sendingEmail,
        pass: process.env.sendingPass
    }
})

const Signup = async (req, res) => {
    try {
        const { name, email, password, confirmPwd, role } = req.body

        const existUser = await authModel.findOne({ email })
        if (existUser) {
            return res.status(400).json({Message: 'User already exists, Please sign-in'})
        }

        if (role === 'Employee') {
            var existEmp = await empModel.findOne({ email })
            console.log(existEmp);
            if (!existEmp) {
                return res.status(404).json({Message: "Email dosen't found in employees list"})
            }
        }
        
        const existAdmin = await authModel.findOne({ role: 'Admin' })
        console.log(existAdmin);
        
        if (role === 'Admin') {
            if (existAdmin) {
                return res.status(409).json({Message: 'admin already exist. access denied'})
            }
        }
        const otp = otpGen.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(`Generated OTP for ${email}: ${otp}`)

        const mailOption = {
            to: email,
            subject: 'Verification for Signup',
            html: `<h1>${otp}<h1/>`            
        }
        await transporter.sendMail(mailOption)        

        if (password !== confirmPwd) {
            console.log('Password do not match');
            return res.status(400).json({ Message: 'Password do not match' })
            
        }
        const hashPwd = await bcrypt.hash(password, 10)

        const user = await authModel.create({
            name: existEmp ? existEmp.name : name,
            email,
            password: hashPwd,
            role,
            otp: otp,
            otpExpired: Date.now() + 60*1000*10
        })
        return res.status(201).json({Message: 'User Signed up successfully', user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'User Sign up failed', error })
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body

        const existUser = await authModel.findOne({ email })
        if (!existUser) {
            return res.status(404).json({ Message: 'User does not exist, Please signup'})
        }
        console.log(`Received OTP for ${email}: ${otp}`);
        console.log(`Stored OTP for ${email}: ${existUser.otp}`);
        console.log(otp === existUser.otp);
        
        if (otp !== existUser.otp || existUser.otpExpired < Date.now()) {
            return res.status(409).json({Message:'Invalid OTP or OTP has expired'})
        }
        existUser.otpExpired = true
        existUser.otp = null
        existUser.otpExpired = null
        await existUser.save()

        return res.status(200).json({Message:'User verified successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'User verification failed', error })
    }
}

const Signin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const existUser = await authModel.findOne({ email })
        if (!existUser) {
            return res.status(404).json({Message: 'User does not exist, Please signup'})
        }

        const decodedPwd = await bcrypt.compare(password, existUser.password)
        if (!decodedPwd) {
            return res.status(409).json({Message: 'Incorrect password'})
        }

        const token = jwt.sign({
            email: existUser.email,
            role: existUser.role,
            name: existUser.name
        },
            'secret-key', {expiresIn: '1h'}
        )
        console.log('Name:', token.name);
        console.log('Email:', token.email);
        console.log('Role:', token.role);
        
        return res.status(200).json({Message: 'User signed in successfully', token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'User Sign in failed', error })
    }
}

module.exports = { Signup, Signin, verifyOTP }