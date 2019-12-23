const express = require('express')
const Job = require('../models/job')
const router = new express.Router()

router.post('/job', auth,  async (req, res) => {
    const job = new Job(req.body)
    job._lead = req.user._id
    job._crew = [...job._crew, job._lead]
    if (!req.user) {
      throw new Error("Must be authenticated")
    }
    try {
      await job.save()
      res.status(201).send({
        job
      })
    } catch (error) {
      res.status(400).send(error)
    }
})

module.exports = router