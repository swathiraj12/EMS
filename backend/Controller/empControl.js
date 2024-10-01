const empModel = require('../Model/empModel')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cloudUpload = require('../Helper/cloudinaryUploader')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const location = path.join(__dirname, '..', 'Pictures')
        if (!fs.existsSync(location)) {
            fs.mkdirSync(location)
        }
        cb(null, location)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})
const picUpload = multer({ storage: storage })

const createUser = async (req, res) => {
    try {
        const { name, serialNo, phnNum, emgPhnNo, email, bloodGrp, address1, address2, state, pincode, doj, designation, role, salary } = req.body
        const addressData = { address1, address2, state, pincode }
        const picture = req.file
        
        const imgResult = await cloudUpload(picture.path)
        console.log(imgResult);

        const user = await empModel.create({
            name,
            serialNo,
            phnNum,
            emgPhnNo,
            email,
            bloodGrp,
            address: addressData,
            doj,
            designation,
            role,
            salary,
            picture: {
                imageUrl: imgResult.url,
                publicId: imgResult.public_id
            }
        })
        return res.status(201).json({Message: 'User created successfully', user})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ Message: 'User creation failed', error })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await empModel.find()
        return res.status(200).json({Message: 'All user details:', users})
    } catch (error) {
        return res.status(500).json({ Message: 'Internal error in fetching all user details', error })
    }
}

const getUserById = async (req, res) => {
    try {
        const { email } = req.params
        const users = await empModel.findOne({ email })
        return res.status(200).json({Message: 'User details:', users})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({Message: 'Internal server error in fetching the user details', error})
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, serialNo, phnNum, emgPhnNo, email, bloodGrp, address1, address2, state, pincode, doj, designation, role, salary } = req.body
        const addressData = { address1, address2, state, pincode }
        const picture = req.file

        const imgResult = await cloudUpload(picture.path)
        console.log(imgResult);

        const user = await empModel.findByIdAndUpdate(id, {
            name,
            serialNo,
            phnNum,
            emgPhnNo,
            email,
            bloodGrp,
            address: addressData,
            doj,
            designation,
            role,
            salary,
            picture: {
                imageUrl: imgResult.url,
                publicId: imgResult.public_id
            }
        }, { new: true })
        return res.status(200).json({Message: 'User details updated successfully', user})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ Message: 'User details updation failed', error })
    }
}

const delUser = async (req, res) => {
    try {
        const { id } = req.params
        await empModel.findByIdAndDelete(id)
        return res.status(200).json({Message: 'User deleted successfully'})
    } catch (error) {
        return res.status(500).json({ Message: 'User deletion failed', error })
    }
}
module.exports = { picUpload, createUser, getUsers, getUserById, updateUser, delUser }