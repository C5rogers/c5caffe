const passport = require('passport')
const User = require('../database/schemas/User')
const { Strategy } = require('passport-local')
const validator = require('../utils/validator')
const { hashedPassword } = require('../utils/password')
const fs = require('fs')
const { getFileExtension, generateHashedFileName } = require('../utils/fileRelated')
const path = require('path')

passport.use(
    new Strategy({
        usernameField: "email",
    }, async(username, email, phone, location, password, gender, profile, done) => {
        try {
            const errors = {}
            let result = validator.isValidName(username)
            if (result == 1) {
                errors.username = "Username is required"
            } else if (result == 2) {
                errors.username = "Invalid username"
            }
            result = validator.isValidEmail(email)
            if (result == 1) {
                errors.email = "Email is required"
            } else if (result == 2) {
                errors.email = "Invalid email address"
            }
            result = validator.isValidPhonenumber(phone)
            if (result == 1) {
                errors.phone = "Phone is required too"
            } else if (result == 2) {
                errors.phone = "Invalid phone number address"
            }
            result = validator.isValidPassword(password)
            if (result == 1) {
                errors.password = "Password is required"
            } else if (result == 2) {
                errors.password = "Invalid password"
            }
            result = validator.isValidGender(gender)
            if (result == 1) {
                errors.gender = "Gender is required too"
            } else if (result == 2) {
                errors.gender = "Invalid gender"
            }
            result = validator.isValidName(location)
            if (result == 1) {
                errors.location = "Location is requierd"
            }
            if (Object.keys(errors).length > 0) {
                done(errors, null)
            }
            const userDb = await User.findOne({
                $or: [
                    { email },
                    { phone }
                ]
            })
            if (userDb) {
                errors.message = "You already have an account with this credentials"
                done(errors, null)
            } else {
                if (profile) {
                    let filepath
                    try {
                        const fileextension = getFileExtension(profile)
                        const hashedFileName = generateHashedFileName(fileextension)
                        filepath = path.join(__dirname, '/public/profile', hashedFileName)
                        const fileData = profile.replace(/^data:image\/\w+;base64,/, '')
                        const buffere = Buffer.from(fileData, 'base64')
                        fs.writeFile(filepath, buffere, (error) => {
                            if (error) {
                                if (gender == 'm' || gender == 'M') {
                                    hashedFileName = 'male.png'
                                } else {
                                    hashedFileName = 'female.png'
                                }
                                filepath = path.join(__dirname, '/public/profile', hashedFileName)
                            }
                        })
                    } catch (error) {
                        console.log("error while uploading image")
                        done(error, null)
                    }

                    //signup the user
                    const userNewPassword = hashedPassword(password)
                        //create the object and respond with jwt
                    const newUser = await User.create({ username, gender, email, phone, location, password: userNewPassword, profile: filepath, roll: "user" })
                    passport.serializeUser((newUser, done) => {
                        done(null, newUser)
                    })
                } else {
                    let hashedFileName
                    if (gender == 'm' || gender == 'M') {
                        hashedFileName = 'male.png'
                    } else {
                        hashedFileName = 'female.png'
                    }
                    const filepath = path.join(__dirname, '/public/profile', hashedFileName)
                    const newUserPassword = hashedPassword(password)
                    const newUser = await User.create({ username, gender, email, phone, location, password: newUserPassword, profile: filepath, roll: "user" })
                    passport.serializeUser((newUser, done) => {
                        done(null, newUser)
                    })
                }
            }
        } catch (error) {
            console.log("error:" + error)
            done(error, null)
        }
    })
)