const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true, 
        trim: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: true, 
        required: true, 
        lowercase: true, 
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String, 
        required: true, 
        validate(value) {
            if (value < 6) {
                throw new Error("Password must min of 6 characters")
            }
        }
    },
    date: {
        type: Date, 
    },
    jobs: [{
        type: Schema.Types.ObjectId, 
        ref: "Job"
    }], 
    isAvaliable: {
        type: Boolean, 
        default: false
    }, 
    isAdmin: {
        type: Boolean, 
        default: false 
    }, 
    tokens: [{
        token: {
            type: String, 
            require: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisthecrewuptoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token 
}

// Hash password before saving 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) 
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
// mongoose Middleware
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User