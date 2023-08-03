const User = require('../../database/schemas/User')
const Product = require('../../database/schemas/Product')
const Order = require('../../database/schemas/Order')
const dotenv = require('dotenv').config('../../../.env')
const { getIdFromToken } = require('../../utils/jwt')
const { isValidObjectId } = require('mongoose')
const axios = require('axios')
const { validate_total_order_price } = require('../../utils/helperMethods')

module.exports.Orders_get = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const orders = await Order.find({ user_id }).populate("product")
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Order_get = async(req, res) => {
    try {
        const _id = req.params.id
        const errors = {}
        if (isValidObjectId) {
            const token = req.cookies.jwt
            const user_id = getIdFromToken(token)
            const order = await Order.findOne({ $and: [{ _id }, { user_id }] }).populate("product")
            return res.status(200).json(order)
        } else {
            errors.order_id = "Invalid order id"
            return res.status(400).json(errors)
        }
    } catch (error) {

    }
}
module.exports.Order_init = async(req, res) => {
    //this is the place where we are going to call the chapa end point to done the request
    //extract the data 
    //make sure the correct total_price is
    //get the user and product information 
    //create the order
    //get the payment link from chapa
    //return the link to client

    try {
        const { product_id, quantity, total_price } = req.body
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const user = await User.findOne({ _id: user_id })
        const product = await Product.findOne({ _id: product_id })
        let verifyed_total_price
        if (validate_total_order_price(Number(total_price), Number(quantity), product.price)) {
            verifyed_total_price = Number(total_price)
        } else {
            verifyed_total_price = Number(quantity) * product.price
        }
        const body = {
            'amount': verifyed_total_price,
            "currency": "ETB",
            "email": user.email,
            "phone_number": user.phone,
            "user_name": user.name,
            "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
            "return_url": "https://www.google.com/",
            "customization[title]": "c5caffe payment method",
            "customization[description]": "Our caffe also provide very simple and optional payment methods and gateways for our clients. and this make us unique"
        }
        const newOrder = await Order.create({ user_id: user, product, quantity, total_price: verifyed_total_price })
        const chapaResponce = await axios.post(dotenv.parsed.CHAPA_PAYMENT_ENDPOINT, { body }, {
            headers: {
                'Authorization': 'Bearer ' + dotenv.parsed.CHAPA_SECRET_KEY,
                'Content-Type': 'application/json',
            }
        })
        return res.status(200).json({ paymentUrl: chapaResponce.data.paymentUrl })
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json(error)
    }
}
module.exports.Order_complete = async(req, res) => {
    console.log("we are here now")
}
module.exports.Order_edit = async(req, res) => {

}
module.exports.Order_delete = async(req, res) => {
    try {
        const order_id = req.params.id
        if (isValidObjectId(order_id)) {
            const order = await Order.findOne({ _id: order_id })
            if (order) {
                Order.deleteOne({ _id: order_id })
                return res.status(200).json({ message: "Order deleted successfully" })
            } else {
                return res.status(400).json({ message: "There is no order with this id to delete" })
            }
        } else {
            return res.status(400).json({ message: "Invalid order id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}