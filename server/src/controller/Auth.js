const validator = require('../utils/validator')
const { compareHashedPassword, hashedPassword } = require('../utils/password')
const User = require('../database/schemas/User')
const { generateHashedFileName, getFileExtension } = require('../utils/fileRelated')
const { generateToken } = require('../utils/jwt')
const dotenv = require('dotenv').config('../../.env')
const path = require('path')

module.exports.Signup_post = async(req, res) => {
    const { username, email, phone, location, password, gender, profile } = req.body
    try {
        if (profile) {
            return res.status(201).json("almost registered")
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
        const isValidPassowrd = compareHashedPassword(password, userDb.password)
        if (isValidPassowrd) {
            const token = generateToken(userDb._id)
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