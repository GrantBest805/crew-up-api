const express = require("express")
const Company = require("../models/company")
const User = require("../models/user")
const router = new express.Router()

const auth = require("../middleware/auth")

// Create New Company
router.post("/api/company", auth, async (req, res) => {
  const company = new Company(req.body)
  if (!req.user) {
    throw new Error("Must be authenticated")
  }
  const admin = req.user
  const adminId = req.user._id
  company._users = [...company._users, adminId]
  try {
    const user = await  User.findById(adminId)
    user.isAdmin = true
    user._company = [...user._company, company._id]

    await user.save()
    await company.save()
    res.status(201).send({
      company
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
// Join Company
router.get("/api/joinCompany",auth, async (req, res) => {
  const company = await Company.findOne({ ID: req.body.ID })
  if (!company) {
    throw new Error({ error: "Must match companies ID" })
  }
  let user = req.user
  company._users = [...company._users, user._id]
  user._company = [...user._company, company._id]
  try {
    await req.user.save()
    await company.save()
    res.send({
      company,
      user
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
