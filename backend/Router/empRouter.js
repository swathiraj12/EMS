const empControl = require('../Controller/empControl')
const express = require('express')
const empRouter = express.Router()
//Creating Users
empRouter.post('/create', empControl.picUpload.single('picture'), empControl.createUser)
//Getting all Users
empRouter.get('/getusers', empControl.getUsers)
//Getting user by email
empRouter.get('/getuser/:email', empControl.getUserByEmail)
//Getting user by id
empRouter.get('/getuserbyid/:id', empControl.getUserById)
//Getting admin existance
empRouter.get('/check-admin', empControl.CheckAdmin)
//Editing user by id
empRouter.put('/updateuser/:id', empControl.picUpload.single('picture'), empControl.updateUser)
//Deleting user by id
empRouter.delete('/deluser/:id', empControl.delUser)
// Send email to individual employee
empRouter.post('/sendmail-indivi/:id', empControl.MaitToIndividual)

module.exports = empRouter