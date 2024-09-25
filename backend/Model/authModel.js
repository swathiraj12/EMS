const mongoose = require('mongoose')

const Users = mongoose.model('Authentication',
    new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        confirmPwd: {
            type: String
        },
        role: {
            type: String,
            enum: ['Admin', 'Employee'],
            default: 'Employee'
        },
        otp: {
            type: Number
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otpExpired: {
            type: Date
        }
    })
)
module.exports = Users