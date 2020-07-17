const express = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth')
const unfurl = require('unfurl.js')
const router = express.Router();

router.get('/parse/:url', auth, async(req, res) => {
    try {
        const { url } = req.params
        let data = await unfurl.unfurl(url)
        res.send(data)
    } catch (error) {
       console.log(error)
        res.status(400).send(error)
    }
})

router.get('/translate/:url', auth, async(req, res) => {
    try {
        res.send({ status:'Not Implemented' })
    } catch (error) {
       console.log(error)
        res.status(400).send(error)
    }
})

router.post('/upload', auth, async(req, res) => {
    try {
        res.send({ status:'Not Implemented' })
    } catch (error) {
       console.log(error)
        res.status(400).send(error)
    }
})

router.get('/download/:identifier', auth, async(req, res) => {
    try {
        res.send({ status:'Not Implemented' })
    } catch (error) {
       console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router
