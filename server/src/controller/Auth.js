const validator = require('../utils/validator')
const { compareHashedPassword, hashedPassword } = require('../utils/password')
const User = require('../database/schemas/User')
const { generateToken } = require('../utils/jwt')
const dotenv = require('dotenv').config('../../.env')
const path = require('path')
const { create_cart_from_cookie } = require('../utils/helperMethods')
const Token = require('../database/schemas/Token')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/email/sendEmail.js')


module.exports.Signup_post = async(req, res) => {
    const { username, email, phone, location, password, gender } = req.body
    try {
        if (req.file) {
            let filename = req.file.filename
            let filepath = 'http://localhost:4000' + '/profile/' + filename
            const hashedUserPassword = hashedPassword(password)
            const newUser = await User.create({ username, gender, email, phone, location, password: hashedUserPassword, profile: filepath, roll: "user" })
            const token = generateToken(newUser._id, newUser.roll)
            res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: dotenv.parsed.NODE_ENV === 'production',
                    maxAge: dotenv.parsed.COOKI_MAX_AGE
                })
                //if there is cart in the cookie create the cart object
            if (req.cookies.carts) {
                const carts = JSON.parse(req.cookies.carts)
                await create_cart_from_cookie(carts, newUser._id)
                res.clearCookie("carts")
            }
            const theUser = await User.findOne({ _id: newUser._id }).select("_id username gender location profile roll")
            return res.status(201).json({ message: "authenticated successfully", user: theUser })
        } else {
            let hashedFileName
            if (gender == 'm' || gender == 'M') {
                hashedFileName = 'male.png'
            } else {
                hashedFileName = 'female.png'
            }
            const filepath = 'http://localhost:4000' + '/profile/' + hashedFileName
            const newUserPassword = hashedPassword(password)
            const newUser = await User.create({ username, gender, email, phone, location, password: newUserPassword, profile: filepath, roll: "user" })
            const token = generateToken(newUser._id)
            res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: dotenv.parsed.NODE_ENV === 'production',
                    maxAge: dotenv.parsed.COOKI_MAX_AGE
                })
                //if there is cart in the cookie create the cart object
            if (req.cookies.carts) {
                const carts = JSON.parse(req.cookies.carts)
                await create_cart_from_cookie(carts, newUser._id)
                res.clearCookie("carts")
            }
            const theUser = await User.findOne({ _id: newUser._id }).select("_id username gender location profile roll")
            return res.status(201).json({ message: "authenticated successfully", user: theUser })
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
                //if there is also cart inthe cookie create the cart object
            if (req.cookies.carts) {
                const carts = JSON.parse(req.cookies.carts)
                await create_cart_from_cookie(carts, userDb._id)
                res.clearCookie("carts")
            }
            const theUser = await User.findOne({ _id: userDb._id }).select("_id username gender location profile roll")
            return res.status(200).json({ message: "Authenticated successfully", user: theUser })
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

module.exports.Google_loged = async(req, res) => {
    const user = req.user
    console.log(user)
    return res.status(200).json({ message: "authenticated successfully" })
}


module.exports.Password_reset_request = async(req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "There is no user registered with this email address" })
    }
    const token = await Token.findOne({ user_id: user._id })
    if (token) {
        await token.deleteOne()
    }

    const bcryptSalt = bcrypt.genSaltSync()
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))
    const newToken = await Token.create({
        user_id: user._id,
        token: hash,
        created_at: Date.now()
    })
    const link = `${dotenv.parsed.CLIENT_URL}change_password?token=${resetToken}&id=${user._id}`
    const result = await sendEmail(user.email, "Password Reset Request", { name: user.username, link: link }, "./template/requestResetPassword.handlebars")
    if (result == true) {
        return res.status(201).json({ message: "Verify your email to change your password", token: newToken })
    } else {
        return res.status(500).json({ message: "Error in sending email to the client" })
    }
}

module.exports.Update_password = async(req, res) => {
    const { token, user_id, password } = req.body
    const theToken = await Token.findOne({ user_id })
    if (!theToken) {
        return res.status(400).json({ message: "Invalid or expired password reset token!" })
    }
    const isValidToken = await bcrypt.compare(token, theToken.token)
    if (!isValidToken) {
        return res.status(400).json({ message: "Invalid password reset token" })
    }
    const hashedPassword = hashedPassword(password)
    await User.updateOne({ _id: user_id }, { $set: { password: hashedPassword } }, { new: true })
    const user = await User.findOne({ _id: user_id })
    const sentresult = sendEmail(user.email, "Password Reset Successfully", { name: user.username }, './template/resetPassword.handlebars')
    if (sentresult == true) {
        return res.status(200).json({ message: "Password updated successfully" })
    } else {
        return res.status(200).json({ error: "unable to send email to client", message: "Password reseted successfully" })
    }
}