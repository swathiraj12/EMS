const mongoose = require('mongoose')

const Users = mongoose.model('Authentication',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter valid email address"]
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        confirmPwd: {
            type: String,
            // required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Employee'],
            default: 'Employee'
        },
        otp: {
            type: Number,
            default: null
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otpExpired: {
            type: Date,
            default: null
        }
    })
)
module.exports = Users