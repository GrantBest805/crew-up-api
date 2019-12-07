const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
    _admin: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    name: {
        type: String,
        unique: true,  
        required: true, 
        trim: true
    }, 
    ID: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    _users: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }], 
    _jobs: [{
        type: Schema.Types.ObjectId, 
        ref: "Job"
    }], 
    date: {
        type: Date, 
        default: Date.now
    }
})

const Company = mongoose.model("Company", companySchema);

module.exports = Company