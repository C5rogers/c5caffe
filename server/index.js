const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authRouter = require('./src/routes/auth')
const productRouter = require('./src/routes/services/product')
require('dotenv').config()
require('./src/database/connection')

// require('./src/strategys/local')


//defining the app
const app = express()

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.json({ limit: "200mb" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})
app.use(express.static('public'))


//defining passport
app.use(passport.initialize())
app.use(passport.session())

//define the routes here
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)

//initialize the app
app.listen(process.env.SERVER_PORT, () => console.log(`the server runs at port: ${process.env.SERVER_PORT}`))