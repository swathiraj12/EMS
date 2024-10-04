const express = require('express')
const app = express()
const PORT = process.env.port
const cors = require('cors')
const mongoose = require('mongoose')
const authModel = require('./Model/authModel')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())

const empRouter = require('./Router/empRouter')
const authRouter = require('./Router/authRouter')

app.use(empRouter)
app.use(authRouter)

//create first admin
const createAdminIfNotExists = async () => {
    try {
        const adminExists = await authModel.findOne({ role: "Admin" })
        if (adminExists) {
            console.log('Admin already exists');
            return
        }
        // Ensure environment variables are defined
        if (!process.env.Admin_Password || !process.env.Admin_Email) {
            console.error("Admin email or password is not defined in the environment variables.");
            return;
        }
        // Hash the password
        const saltRounds = bcrypt.genSaltSync(10)
        
        // Create first admin based on environment variables
        const hashedPwd = bcrypt.hashSync(process.env.Admin_Password, saltRounds)

        await authModel.create({
            name: "Admin",
            email: process.env.Admin_Email,
            password: hashedPwd,
            role: "Admin"
        })
        console.log('Admin created from environment variables');
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}
//createAdminIfNotExists()
//Use only on production for create a first admin

mongoose.connect(process.env.mongoDB)
    .then(() => {
        console.log('DB connected');
    })
app.listen(PORT, () => {
    console.log('Server connected on', PORT);
})