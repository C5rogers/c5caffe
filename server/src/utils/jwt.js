const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config('../../.env')


const expiredate = 30 * 24 * 60 * 60
const generateToken = (userId, UserRoll) => {
    const payload = {
        "userId": userId,
        "userRoll": UserRoll
    }

    const token = jwt.sign(payload, dotenv.parsed.JWT_SECRET, { expiresIn: expiredate })
    return token
}

const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, dotenv.parsed.JWT_SECRET)
        return decoded
    } catch (error) {
        throw Error(error.message)
    }
}

const getIdFromToken = (token) => {
    const decoded = verfiyToken(token)
    return decoded.userId
}
const getRollFromToken = (token) => {
    const decoded = verfiyToken(token)
    return decoded.userRoll
}
module.exports = {
    generateToken,
    verfiyToken,
    getIdFromToken,
    getRollFromToken
}