const validator = require('../utils/validator')
const { compareHashedPassword, hashedPassword } = require('../utils/password')
const User = require('../database/schemas/User')
const { generateToken } = require('../utils/jwt')
const dotenv = require('dotenv').config('../../.env')
const path = require('path')

module.exports.Signup_post = async(req, res) => {
    const { username, email, phone, location, password, gender } = req.body
    try {
        if (req.file) {
            let filename = req.file.filename
            let filepath = path.join(__dirname, '/public/profile', filename)
            const hashedUserPassword = hashedPassword(password)
            const newUser = await User.create({ username, gender, email, phone, location, password: hashedUserPassword, profile: filepath, roll: "user" })
            const token = generateToken(newUser._id, newUser.roll)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: dotenv.parsed.NODE_ENV === 'production',
                maxAge: dotenv.parsed.COOKI_MAX_AGE
            })
            return res.status(201).json({ message: "authenticated successfully", user: newUser })
        } else {
            let hashedFileName
            if (gender == 'm' || gender == 'M') {
                hashedFileName = 'male.png'
            } else {
                hashedFileName = 'female.png'
            }
            const filepath = path.join(__dirname, '/public/profile', hashedFileName)
            const newUserPassword = hashedPassword(password)
            const newUser = await User.create({ username, gender, email, phone, location, password: newUserPassword, profile: filepath, roll: "user" })
            const token = generateToken(newUser._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: dotenv.parsed.NODE_ENV === 'production',
                maxAge: dotenv.parsed.COOKI_MAX_AGE
            })
            return res.status(201).json({ message: "authenticated successfully", user: newUser })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports.Login_post = async(req, res) => {
    try {
        const { email, password } = req.body
        const errors = {}
        const userDb = await User.findOne({ email })
        if (!userDb || userDb == null) {
            errors.message = "Invalid credentials"
        }
        if (Object.keys(errors).length > 0) {
            return res.status(401).json(errors)
        }
        const crossCheckPassword = await compareHashedPassword(password, userDb.password)
        if (crossCheckPassword) {
            const token = generateToken(userDb._id, userDb.roll)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: dotenv.parsed.NODE_ENV === 'production',
                maxAge: dotenv.parsed.COOKI_MAX_AGE
            })
            return res.status(200).json({ message: "Authenticated successfully", user: userDb })
        } else {
            errors.message = "Invalid credentials"
            return res.status(401).json(errors)
        }

    } catch (error) {
        console.log('error:' + error)
        res.status(500).json(error)
    }
}


module.exports.Logout_post = async(req, res) => {
    res.clearCookie("jwt")
    return res.status(200).json({ message: "loged out successfully" })
}