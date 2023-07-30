const passport = require('passport')
const User = require('../database/schemas/User')
const { Strategy } = require('passport-local')
const validator = require('../utils/validator')
const { hashedPassword } = require('../utils/password')
const fs = require('fs')

passport.use(
    new Strategy({
        usernameField: "email",
    }, async(username, email, phone, location, password, gender, profile, done) => {
        try {
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
            if (Object.keys(errors).length > 0) {
                done(errors, null)
            }
            if (profile) {
                let filepath
            }
        } catch (error) {
            console.log("error:" + error)
            done(error, null)
        }
    })
)