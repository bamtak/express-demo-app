const jwt = require('jsonwebtoken')
const constants = require("../constants")

const auth = async(req, res, next) => {
    const headers = req.header('Authorization')
    const token = headers && headers.split(' ')[1]
    jwt.verify(token, constants.JWT_KEY, (err, user) => {
        console.log(err)
        if (err) return res.status(401).send({ error: 'Not authorized to access this resource' })
        req.user = user
        next()
      })
}

module.exports = auth