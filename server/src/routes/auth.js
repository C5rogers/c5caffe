const { Router } = require('express')
const passport = require('passport')
const User = require('../database/schemas/User')
const AuthController = require('../controller/Auth')
const validations = require('../middlewares/validations')
const validator = require('../utils/validator')

const router = Router()

//the custome auth
router.post("/login", validations.custome_login_validations, AuthController.Login_post)
router.post("/signup", validations.custome_signup_validations, AuthController.Signup_post)


module.exports = router