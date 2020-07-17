const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constants = require("../constants")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        set: value => bcrypt.hashSync(value, 8)
    }
})

userSchema.methods.generateAuthToken = function() {
    const user = this
    return jwt.sign({_id: user._id, username: user.username}, constants.JWT_KEY, { expiresIn: "24h"})
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username})
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User