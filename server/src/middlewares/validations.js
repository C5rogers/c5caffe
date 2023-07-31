const validator = require('../utils/validator')
const User = require('../database/schemas/User')

module.exports.custome_login_validations = (req, res, next) => {
    const { email, password } = req.body
    const errors = {}
    let result = validator.isValidEmail(email)
    if (result == 1) {
        errors.email = "Email field is required"
    } else if (result == 2) {
        errors.email = "Invalid email address"
    }
    result = validator.isValidPassword(password)
    if (result == 1) {
        errors.password = "Password is required"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(401).json(errors)
    }
    next()
}

module.exports.custome_signup_validations = async(req, res, next) => {
    const { username, email, phone, location, password, gender } = req.body
    const errors = {}
    let result = validator.isValidName(username)
    if (result == 1) {
        errors.username = "Username is required"
    } else if (result == 2) {
        errors.username = "Invalid username"
    }
    result = validator.isValidEmail(email)
    if (result == 1) {
        errors.email = "Email is required"
    } else if (result == 2) {
        errors.email = "Invalid email address"
    }
    result = validator.isValidPhonenumber(phone)
    if (result == 1) {
        errors.phone = "Phone is required too"
    } else if (result == 2) {
        errors.phone = "Invalid phone number address"
    }
    result = validator.isValidPassword(password)
    if (result == 1) {
        errors.password = "Password is required"
    } else if (result == 2) {
        errors.password = "Invalid password"
    }
    result = validator.isValidGender(gender)
    if (result == 1) {
        errors.gender = "Gender is required too"
    } else if (result == 2) {
        errors.gender = "Invalid gender"
    }
    result = validator.isValidName(location)
    if (result == 1) {
        errors.location = "Location is requierd"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(401).json(errors)
    }
    const userDb = await User.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (userDb) {
        errors.message = "You already have an account with this credentials"
        return res.status(401).json(errors)
    }

    next()
}