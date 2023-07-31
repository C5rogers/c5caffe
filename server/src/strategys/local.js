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
                console.log(errors)
                done(errors, null)
                    // return done(null, false, errors)
            }


            const userDb = await User.findOne({ email })
            if (!userDb || userDb == null) {
                errors.message = "Invalid credentials"
            }
            if (Object.keys(errors).length > 0) {
                return done(errors, null)
                    // return done(null, false, errors)
            }
            const isValidPassowrd = compareHashedPassword(password, userDb.password)
            if (isValidPassowrd) {
                passport.serializeUser((userDb, done) => {
                    return done(null, userDb)
                })
            } else {
                errors.message = "Invalid credentials"
                done(errors, null)
                    // return done(null, false, errors)
            }
        } catch (error) {
            console.log('error:' + error)
            done(error, null)
                // return done(null, false, error)
        }
    })
)