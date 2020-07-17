const express = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/users', async (req, res) => {
  try {
      const user = new User(req.body)
      await user.save()
      const token = user.generateAuthToken()
      res.status(201).send({ user, token })
  } catch (error) {
      console.log(error)
      res.status(400).send(error)
  }
})

router.get('/me', auth, async(req, res) => {
  res.send(req.user)
})

router.get('/login/:username/:password', async(req, res) => {
    try {
        const { username, password } = req.params
        const user = await User.findByCredentials(username, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = user.generateAuthToken()
        res.send({ token })
    } catch (error) {
       console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router
