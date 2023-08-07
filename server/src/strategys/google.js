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
    console.log(profile)
    done(null, profile)
}))