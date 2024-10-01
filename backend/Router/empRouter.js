const empControl = require('../Controller/empControl')
const express = require('express')
const empRouter = express.Router()

empRouter.post('/create', empControl.picUpload.single('picture'), empControl.createUser)

empRouter.get('/getusers', empControl.getUsers)

empRouter.get('/getuser/:email', empControl.getUserById)

empRouter.put('/updateuser/:id', empControl.picUpload.single('picture'), empControl.updateUser)

empRouter.delete('/deluser/:id', empControl.delUser)

module.exports = empRouter