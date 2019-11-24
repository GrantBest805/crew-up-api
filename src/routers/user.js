const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const auth = require('../middleware/auth')

// Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
// User Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send({ error: "Invalid email or password"})
    }

})
// User Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
// Get Current User
router.get('/users/current', auth, async (req, res) => {
    res.send(req.user)
})
// Update User
router.patch('/users/:id', auth, async (req, res) => {
    const isAdmin = req.user.isAdmin
    const updates = Object.keys(req.body)
    const allowedUpdates = isAdmin ? ['name', 'email', 'password', 'isAvaliable', 'isAvaliable', 'isAdmin'] : ['name', 'email', 'password', 'isAvaliable']
    const isValidOptions = await updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOptions) {
        return res.status(400).send({
            error: "Invalid Update"
        })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach(property => user[property] = req.body[property])
        await user.save()
        res.send(user)

    } catch (error) {
        res.status(400).send(error)
    }
})
// Delete User
router.delete('/users/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        
        if (!user) {
            return req.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
}) 

module.exports = router