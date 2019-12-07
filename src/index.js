const express = require('express')
const port = process.env.PORT || 8000
const cors = require('cors')
// Load Database
require('./db/mongoose')

const userRouter = require('./routers/user')
const jobRouter = require('./routers/job')
const companyRouter = require('./routers/company')

const app = express()
app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(jobRouter)
app.use(companyRouter)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})