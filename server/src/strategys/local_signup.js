const passport = require('passport')
const User = require('../database/schemas/User')
const { Strategy } = require('passport-local')

passport.use(
    new Strategy({
        usernameField: "email",
    }, async(username, email, phone, location, password, profile, done) => {
        try {

        } catch (error) {
            console.log("error:" + error)
            done(error, null)
        }
    })
)