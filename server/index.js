const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authRouter = require('./src/routes/auth')
const productRouter = require('./src/routes/services/product')
const ratingRouter = require('./src/routes/services/rating')
const middleware = require('./src/middlewares/authCheck')
const orderRouter = require('./src/routes/services/order')
const cartRouter = require('./src/routes/services/cart')
const selledOrderRouter = require('./src/routes/services/selledorder')
const catagoryRouter = require('./src/routes/services/catagory')
const chartRouter = require('./src/routes/services/forChart')
const path = require('path')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
require('./src/database/connection')
require('./src/strategys/google')



//defining the app
const app = express()
app.use(express.static('public'))
app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.message })
})
app.use(bodyParser.json({ limit: "200mb" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})


//defining passport
app.use(passport.initialize())
app.use(passport.session())

//define the routes here
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/rating', middleware.protect_with_auth, ratingRouter)
app.use('/api/v1/order', middleware.protect_with_auth, orderRouter)
app.use('/api/v1/selled_order', middleware.protect_with_auth, selledOrderRouter)
app.use('/api/v1/cart', middleware.protect_with_auth, cartRouter)
app.use('/api/v1/catagory', middleware.protect_with_auth, middleware.check_auth_admin, catagoryRouter)
app.use('/api/v1/chart', chartRouter)

//initialize the app
app.listen(process.env.SERVER_PORT, () => console.log(`the server runs at port: ${process.env.SERVER_PORT}`))