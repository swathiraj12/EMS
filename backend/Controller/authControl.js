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
//get user details from employee model
const GetUserDetails = async (req, res) => {
    try {
        const { email } = req.params
        const user = await empModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ Message: 'User not found' })
        }
        const userDetails = {
            name: user.name,
            email: user.email,
            role: user.role,
            picture: user.picture.imageUrl,
            designation: user.designation
        }
        return res.status(200).json({ Message: 'User details:', userDetails })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal error in fetching User details', error })
    }
}
//singup
const Signup = async (req, res) => {
    try {
        const { name, email, password, confirmPwd, role } = req.body

        const existUser = await authModel.findOne({ email })
        if (existUser) {
            return res.status(400).json({ Message: 'User already exists, Please sign-in' })
        }

        if (role === 'Employee') {
            var existEmp = await empModel.findOne({ email })
            console.log(existEmp);
            if (!existEmp) {
                return res.status(404).json({ Message: "Email dosen't found in employees list" })
            }
        }

        const existAdmin = await authModel.findOne({ role: 'Admin' })
        console.log(existAdmin);

        if (role === 'Admin') {
            if (existAdmin) {
                return res.status(409).json({ Message: 'admin already exist. access denied' })
            }
        }
        const otp = otpGen.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(`Generated OTP for Signup ${email}: ${otp}`)

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
            otpExpired: Date.now() + 60 * 1000 * 10
        })
        return res.status(201).json({ Message: 'User Signed up successfully', user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal error in User Sign up', error })
    }
}
//OTP verification for signup
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body

        const existUser = await authModel.findOne({ email })
        if (!existUser) {
            return res.status(404).json({ Message: 'User does not exist, Please signup' })
        }
        console.log(`Received OTP for ${email}: ${otp}`);
        console.log(`Stored OTP for ${email}: ${existUser.otp}`);
        console.log(otp === existUser.otp);

        if (otp !== existUser.otp || existUser.otpExpired < Date.now()) {
            return res.status(409).json({ Message: 'Invalid OTP or OTP has expired' })
        }
        existUser.otp = null
        existUser.otpExpired = null
        existUser.isVerified = true
        await existUser.save()

        return res.status(200).json({ Message: 'User verified successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal error in User verification', error })
    }
}
//signin
const Signin = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existUser = await authModel.findOne({ email })
        if (!existUser) {
            return res.status(404).json({ Message: 'User does not exist, Please signup' })
        }

        const decodedPwd = await bcrypt.compare(password, existUser.password)
        if (!decodedPwd) {
            return res.status(409).json({ Message: 'Incorrect password' })
        }

        const token = jwt.sign({
            id: existUser._id,
            email: existUser.email,
            role: existUser.role,
            name: existUser.name
        },
            'secret-key', { expiresIn: '1h' }
        )
        console.log('Name:', token.name);

        return res.status(200).json({ Message: 'User signed in successfully', token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal error in User Sign in', error })
    }
}
//Change password with old password
const UserPwdChange = async (req, res) => {
    try {
        const { id } = req.params
        const { oldPwd, newPwd } = req.body

        // console.log(req.params)
        // console.log(req.body)

        const user = await authModel.findById(id)

        if (!user) return res.status(404).json({ Message: 'User not found' })
        // console.log(oldPwd, user.password);

        const isPwdMatch = await bcrypt.compare(oldPwd, user.password)
        // console.log(isPwdMatch);

        if (!isPwdMatch) return res.status(400).json({ Message: 'Password does not match. Please enter correct one.' })

        const hashedPwd = await bcrypt.hash(newPwd, 10)

        await authModel.findByIdAndUpdate(id, { password: hashedPwd })

        return res.status(200).json({ Message: 'Password changed' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error in changing password" })
    }
}
//Forget password with token and OTP
const UserForgetPwd = async (req, res) => {
    try {
        const { email } = req.body

        const existUser = await authModel.findOne({ email })
        if (!existUser) {
            return res.status(404).json({ Message: 'User not found' })
        }

        const otp = otpGen.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(`Generated OTP for Forget Password ${email}: ${otp}`)

        existUser.otp = otp
        existUser.otpExpired = Date.now() + 60 * 1000 * 10

        await existUser.save()

        const mailOption = {
            to: email,
            subject: 'Verification for Forget Password',
            html: `<h1>${otp}<h1/>`
        }
        await transporter.sendMail(mailOption)
        return res.status(200).json({ Message: 'OTP sent for Password reset' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal error in sending OTP' })
    }
}
//Resetting Password
const UserResetPwd = async (req, res) => {
    try {
        const { email, newPwd } = req.body

        const user = await authModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ Message: 'User not found' })
        }

        user.password = await bcrypt.hash(newPwd, 10)
        await user.save()
        return res.status(200).json({ Message: 'Password changed' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error in changing password" })
    }
}
// Send email to all employees
const MailToAll = async (req, res) => {
    try {
        const { subject, message } = req.body
        const employeeEmails = await empModel.find().select('email')

        if (!employeeEmails.length) {
            return res.status(400).send('No employees found');
          }

        const mailOptionToall = {
            from: 'swathijayabalraj@gmail.com',
            to: employeeEmails.map(e => e.email).join(','),
            subject,
            html: `<h1>${message}<h1/>`
        }
        const mailsent = transporter.sendMail(mailOptionToall)
        return res.status(200).json({ Message: 'Email sent to all employees successfully', mailsent })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ Message: 'Internal error in sending Email to all employees' })
    }
}
module.exports = {
    Signup,
    Signin,
    verifyOTP,
    UserPwdChange,
    UserForgetPwd,
    UserResetPwd,
    GetUserDetails,
    MailToAll
}