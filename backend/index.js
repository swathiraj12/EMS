const express = require('express')
const app = express()
const PORT = process.env.port
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const empRouter = require('./Router/empRouter')
const authRouter = require('./Router/authRouter')

app.use(empRouter)
app.use(authRouter)

mongoose.connect(process.env.mongoDB)
    .then(() => {
        console.log('DB connected');
    })
app.listen(PORT, () => {
    console.log('Server connected on', PORT);
})