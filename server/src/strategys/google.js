const passport = require('passport')
const dotenv = require('dotenv').config('../../.env')
const GooglePassportStrategy = require('passport-google-oauth20').Strategy
const User = require('../database/schemas/User')
const { generateToken } = require('../utils/jwt')

passport.use(new GooglePassportStrategy({
    clientID: dotenv.parsed.GOOGLE_CLIENT_ID,
    clientSecret: dotenv.parsed.GOOGLE_CLIENT_SECRET,
    callbackURL: dotenv.parsed.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async function(request, accessToken, refreshToken, profile, done) {
    //here we are creating the user information 
    const email = profile.emails
    let userDb = await User.find({ email })
    if (userDb) {
        console.log(userDb)
        const token = generateToken = (userDb._id, userDb.roll)
        const user = {
            email: userDb.email,
            username: userDb.username,
            id: userDb._id,
            profile: userDb.profile,
            token
        }
        done(null, user)
    } else {
        userDb = await User.create({ username: profile.username, email: profile.emails, profile: profile.profileUrl, roll: 'user' })
        console.log(userDb)
        const token = generateToken(userDb._id, userDb.roll)
        const user = {
            email: userDb.email,
            username: userDb.username,
            id: userDb._id,
            profile: userDb.profile,
            token
        }
        done(null, user)
    }
}))

passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
    // passport.deserializeUser((user, done) => {
    //     if (user) {
    //         return done(null, user)
    //     } else {
    //         return done(null, false)
    //     }
    // })