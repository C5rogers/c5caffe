const { Router } = require('express')
const User = require('../database/schemas/User')
const passport = require('passport')
const controller = require('../controller/SignupController')


const router = Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("authenticated successfully")
    res.send(200)
})

router.post('/signup', (req, res, next) => {}, controller);

module.exports = router