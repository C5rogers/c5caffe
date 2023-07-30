const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schemas/User')

passport.use(
    new Strategy({
        usernameField: 'email'
    }, async(email, password, done) => {
        try {

        } catch (error) {
            console.log('error:' + error)
            done(error, null)
        }
    })
)