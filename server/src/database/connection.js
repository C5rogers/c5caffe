const mongoose = require('mongoose')
const dotenv = require('dotenv').config('../../.env')

mongoose.connect(dotenv.parsed.DATABASE_URL)
    .then(() => console.log("now connected to the database"))
    .catch((error) => console.log(error))


module.exports = mongoose