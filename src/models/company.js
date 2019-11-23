const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        trim: true
    }, 
    password: {
        type: String, 
        required: true, 
        trim: true
    },
    users: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }], 
    jobs: [{
        type: Schema.Types.ObjectId, 
        ref: "Job"
    }], 
    date: {
        type: Date
    }
})

const Company = mongoose.model("Company", companySchema);

module.exports = Company