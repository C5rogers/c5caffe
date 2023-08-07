const { Router } = require('express')
const passport = require('passport')
const AuthController = require('../controller/Auth')
const validations = require('../middlewares/validations')
const multer = require('multer')
const { ProfileStorage } = require('../../storage')
const dotenv = require('dotenv').config('../../.env')
const middleware = require('../middlewares/authCheck')


const upload = multer({ storage: ProfileStorage })
const router = Router()

//the custome auth
router.post("/login", middleware.check_authed, validations.custome_login_validations, AuthController.Login_post)
router.post("/signup", middleware.check_authed, upload.single('profile'), validations.custome_signup_validations, AuthController.Signup_post)
router.post("/logout", middleware.protect_with_auth, AuthController.Logout_post)

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', ]
}))

router.get('/google/callback', AuthController.Google_loged)

module.exports = router