const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = mongoose.Schema({
    name: String,
    number: Number, 
    description: String, 
    _lead: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    _crew: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }], 
    date: {
        type: Date, 
        default: Date.now
    }
})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job