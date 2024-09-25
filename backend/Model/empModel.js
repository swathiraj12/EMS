const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: Number
    }
})

const User = mongoose.model('Employee-Detail',
    new mongoose.Schema({
        name: {
            type: String,
            // required: true
        },
        serialNo: {
            type: String,
            // required: true
        },
        phnNum: {
            type: Number,
            // required: true
        },
        emgPhnNo: {
            type: Number
        },
        email: {
            type: String
        },
        bloodGrp: {
            type: String
        },
        address: addressSchema,
        doj: {
            type: String
        },
        designation: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Employee'],
            default: 'Employee'
        },
        salary: {
            type: Number,
            required: true
        },
        picture: {
            imageUrl: String,
            publicId: String
        }
    })
)

module.exports = User