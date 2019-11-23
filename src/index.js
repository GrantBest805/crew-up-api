const express = require('express')
const port = process.env.PORT || 8000
const router = new express.Router()
// Load Database
require('./db/mongoose')
// Load Models
const User = require('./models/user')
const Company = require('./models/company')
const Job = require('./models/job')

const userRouter = require('./routers/user')
const jobRouter = require('./routers/job')

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(jobRouter)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})