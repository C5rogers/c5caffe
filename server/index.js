const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./src/database/connection')


//defining the app
const app = express()

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(bodyParser.json({ limit: "200mb" }))
app.use(bodyParser.urlencoded())

//defining passport
app.use(passport.initialize())
app.use(passport.session())

//define the routes here


//initialize the app
app.listen(process.env.SERVER_PORT, () => console.log(`the server runs at port: ${process.env.SERVER_PORT}`))