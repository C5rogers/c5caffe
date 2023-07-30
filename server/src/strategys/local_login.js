const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schemas/User')
const validator = require('../utils/validator')
const { compareHashedPassword } = require('../utils/password')


passport.use(
    new Strategy({
        usernameField: 'email'
    }, async(email, password, done) => {
        try {
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
                done(errors, null)
            }

            const userDb = await User.findOne({ email })
            if (!userDb) {
                errors.message = "Invalid credentials"
            }
            if (Object.keys(errors).length > 0) {
                done(errors, null)
            }
            const isValidPassowrd = compareHashedPassword(password, userDb.password)
            if (isValidPassowrd) {
                passport.serializeUser((userDb, done) => {
                    done(null, userDb)
                })
            } else {
                errors.message = "Invalid credentials"
                done(errors, null)
            }
        } catch (error) {
            console.log('error:' + error)
            done(error, null)
        }
    })
)