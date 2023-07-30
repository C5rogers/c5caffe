const { Router } = require('express')
const User = require('../database/schemas/User')
const passport = require('passport')


const router = Router()

router.post('/login', passport.authenticate('local_login'), (req, res) => {
    console.log("authenticated successfully")
    res.send(200)
})

router.post('/signup', passport.authenticate('local_signup', (req, res) => {
    console.log("signedup successfully!")
    res.send(200)
}))

module.exports = router