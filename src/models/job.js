const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = mongoose.Schema({
    name: String,
    number: Number, 
    description: String, 
    lead: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    crew: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }]
})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job