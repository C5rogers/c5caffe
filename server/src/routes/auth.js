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
router.post("/signup", middleware.check_authed, upload.single('profile'), AuthController.Signup_post) //there is something error in custome_signup_validation
router.post("/logout", middleware.protect_with_auth, AuthController.Logout_post)

//to reset password
router.post('/password/reset', middleware.check_authed, validations.custome_reset_password_validation, AuthController.Password_reset_request)
router.post('/password/reset/update', middleware.check_authed, validations.custome_reset_password_update_validation, )

router.get('/google', passport.authenticate('google', { session: true, scope: ['profile', 'email'] }))
router.get('/google/callback', AuthController.Google_loged)
    // router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), AuthController.Google_loged)

module.exports = router