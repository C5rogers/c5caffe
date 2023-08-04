const validator = require('../utils/validator')
const User = require('../database/schemas/User')
const { isValidObjectId } = require('mongoose')

module.exports.custome_login_validations = (req, res, next) => {
    const { email, password } = req.body
    const errors = {}
    let result = validator.isValidEmail(email)
    if (result == 1) {
        errors.email = "Email field is required"
    } else if (result == 2) {
        errors.email = "Invalid email address"
    }
    result = validator.isValidPassword(password)
    if (result == 1) {
        errors.password = "Password is required"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(401).json(errors)
    }
    next()
}

module.exports.custome_signup_validations = async(req, res, next) => {
    const { username, email, phone, location, password, gender } = req.body
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
        return res.status(401).json(errors)
    }
    const userDb = await User.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (userDb) {
        errors.message = "You already have an account with this credentials"
        return res.status(401).json(errors)
    }

    next()
}


module.exports.custome_product_create_validation = (req, res, next) => {
    const { name, price, catagory, description } = req.body
    const errors = {}
    if (!name) {
        errors.name = "Name field is required"
    }
    if (!price) {
        errors.price = "Price is also required"
    }
    const parsed = Number(price)
    if (isNaN(parsed)) {
        errors.price = "Invalid price value"
    }
    if (!catagory) {
        errors.catagory = "Catagory is required also"
    }
    if (!req.file) {
        errors.image = "Image also required"
    }
    if (!description) {
        errors.description = "Description is also required"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }
    next()
}

module.exports.custome_order_create_validation = (req, res, next) => {
    const { product_id, quantity, total_price } = req.body
    const errors = {}
    if (!product_id) {
        errors.product_id = "Product id is required"
    } else if (!isValidObjectId(product_id)) {
        errors.product_id = "Invalid product id"
    }
    if (!quantity) {
        errors.quantity = "There is no order with no quantity"
    }
    let parsed = Number(quantity)
    if (isNaN(parsed)) {
        errors.quantity = "Invalid quantity value"
    }
    if (!total_price) {
        errors.total_price = "Total price is also required"
    }
    parsed = Number(total_price)
    if (isNaN(parsed)) {
        errors.total_price = "Invalid toatl price value"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }
    next()
}
module.exports.custome_cart_create_validation = (req, res, next) => {
    const { product_id, ammount } = req.body
    const errors = {}
    if (!product_id) {
        errors.product_id = "Product is required"
    }
    if (!isValidObjectId(product_id)) {
        errors.product_id = "Invalid product reference"
    }
    if (!ammount) {
        errors.ammount = "Ammount also required"
    }
    const parsed = Number(ammount)
    if (isNaN(parsed)) {
        errors.ammount = "Invlaid ammount number"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }
    next()
}