const empControl = require('../Controller/empControl')
const express = require('express')
const empRouter = express.Router()

empRouter.post('/create', empControl.picUpload.single('picture'), empControl.createUser)

empRouter.get('/getusers', empControl.getUsers)

empRouter.get('/getuser/:email', empControl.getUserByEmail)

empRouter.get('/getuserbyid/:id', empControl.getUserById)

empRouter.put('/updateuser/:id', empControl.picUpload.single('picture'), empControl.updateUser)

empRouter.delete('/deluser/:id', empControl.delUser)

// Send email to individual employee
empRouter.post('/sendmail-indivi/:id', empControl.MaitToIndividual)

module.exports = empRouter