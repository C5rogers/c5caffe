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

//to reset password
router.post('/password/reset', middleware.check_authed, validations.custome_reset_password_validation, AuthController.Password_reset_request)
router.post('/password/reset/update', middleware.check_authed, validations.custome_reset_password_update_validation, AuthController.Update_password)

router.get('/google', passport.authenticate('google', { session: true, scope: ['profile', 'email'] }))
router.get('/google/callback', AuthController.Google_loged)
    // router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), AuthController.Google_loged)

// only for the admin
router.get('/users', middleware.protect_with_auth, middleware.check_auth_admin, AuthController.Users_get)
router.delete('/user/:id', middleware.protect_with_auth, middleware.check_auth_admin, AuthController.User_delete)

module.exports = router