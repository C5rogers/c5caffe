const passport = require('passport')
const dotenv = require('dotenv').config('../../.env')
const GooglePassportStrategy = require('passport-google-oauth20').Strategy
const User = require('../database/schemas/User')

passport.use(new GooglePassportStrategy({
    clientID: dotenv.parsed.GOOGLE_CLIENT_ID,
    clientSecret: dotenv.parsed.GOOGLE_CLIENT_SECRET,
    callbackURL: dotenv.parsed.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
    let user = User.find({ email: profile.emails })
    if (user) {
        passport.serializeUser((user, done) => {
            done(null, user)
        })
    } else {
        user = User.create({ username: profile.username, email: profile.emails, profile: profile.profileUrl })
        passport.serializeUser((user, done) => {
            done(null, user)
        })
    }
    const userProfile = profile
    done(null, userProfile)
}))