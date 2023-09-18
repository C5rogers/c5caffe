const User = require('../../database/schemas/User')
const Product = require('../../database/schemas/Product')
const Order = require('../../database/schemas/Order')
const dotenv = require('dotenv').config('../../../.env')
const { getIdFromToken } = require('../../utils/jwt')
const { isValidObjectId } = require('mongoose')
const axios = require('axios')
const { validate_total_order_price, create_cart_from_cookie, get_total_order_price } = require('../../utils/helperMethods')
const { init_payment } = require('../../config/chapa')
const Cart = require('../../database/schemas/Cart')
const SelledOrder = require('../../database/schemas/SelledOrder')


module.exports.Orders_get = async(req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 15
        }
        const { q } = req.query
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        let orders
        if (q) {
            const isNumber = Number(q)
            if (isNaN(isNumber)) {
                regexpQuery = new RegExp(q, 'i')
                orders = await Order.find({
                    $and: [
                        { user: user_id },
                        {
                            $or: [
                                { status: regexpQuery }
                            ]
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
            } else {
                orders = await Order.find({
                    $and: [
                        { user: user_id },
                        {
                            $or: [
                                { total_price: isNumber },
                            ]
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
            }
        } else {
            orders = await Order.find({ user: user_id }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
        }
        const orders_count = await Order.count()
        const total_pages = Math.ceil(orders_count / limit)
        return res.status(200).json({ orders, total_pages, current_page: page })
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
                const order = await Order.findOne({ $and: [{ _id }, { user: user_id }] }).populate("user", "_id username gender location profile").populate("carts")
                return res.status(200).json({ order })
            } else {
                errors.order_id = "Invalid order id"
                return res.status(400).json(errors)
            }
        } catch (error) {

        }
    }
    // module.exports.Order_init = async(req, res) => {
    //     try {
    //         const { product_id, quantity, total_price } = req.body
    //         const token = req.cookies.jwt
    //         const user_id = getIdFromToken(token)
    //         const user = await User.findOne({ _id: user_id })
    //         const product = await Product.findOne({ _id: product_id })
    //         let verifyed_total_price
    //         if (validate_total_order_price(Number(total_price), Number(quantity), product.price)) {
    //             verifyed_total_price = Number(total_price)
    //         } else {
    //             verifyed_total_price = Number(quantity) * product.price
    //         }
    //         const form = {
    //             verifyed_total_price,
    //             email: user.email,
    //             username: user.username,
    //             phone: user.phone,
    //             id: user._id
    //         }
    //         const chapaResponce = await init_payment(form)
    //         if (chapaResponce) {
    //             const newOrder = await Order.create({ user_id: user, product, quantity, total_price: verifyed_total_price })
    //             return res.status(200).json({ paymentUrl: chapaResponce.data.data.checkout_url, newOrder })
    //         } else {
    //             return res.status(400).json({ message: "Invalid request" })
    //         }

//     } catch (error) {
//         console.log("error: " + error)
//         return res.status(500).json(error)
//     }
// }

module.exports.Order_init = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        let overall_total_price
        const user = await User.findOne({ _id: user_id })
        const merged_carts = await Cart.find({ $and: [{ user: user_id }, { status: "unordered" }] })
        if (merged_carts.length > 0) {
            overall_total_price = await get_total_order_price(merged_carts)
            const form = {
                verifyed_total_price: overall_total_price,
                email: user.email,
                username: user.username,
                phone: user.phone,
                id: user._id
            }
            const chapaResponce = await init_payment(form)
            if (chapaResponce) {
                merged_carts.forEach(async(cart) => {
                    await cart.updateOne({ status: "ordered" })
                });
                const newOrder = await Order.create({ user, carts: merged_carts, total_price: overall_total_price })
                const theOrder = await Order.find({ _id: newOrder._id }).populate("user", "_id username gender location profile").populate("carts")
                return res.status(201).json({ paymentUrl: chapaResponce.data.data.checkout_url, theOrder })
            } else {
                return res.status(400).json({ message: "Invalid order request" })
            }
        } else {
            return res.status(400).json({ message: "First need to have cart to order" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Order_complete = async(req, res) => {
    try {
        const order_id = req.params.id
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const user = User.findOne({ _id: user_id })
        if (isValidObjectId(order_id)) {
            const theOrder = await Order.findOne({ _id: order_id })
            await theOrder.updateOne({ status: "payed" })
            const updatedOrder = await Order.findOne({ _id: order_id }).populate("user", "_id username gender location profile").populate("carts")
            await SelledOrder.create({ user: user_id, carts: updatedOrder.carts, total_price: updatedOrder.total_price })
            return res.status(200).json({ message: "Order payed successfully", updatedOrder })
        } else {
            return res.status(400).json({ message: "Invalid order id" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Order_delete = async(req, res) => {
    try {
        const order_id = req.params.id
        if (isValidObjectId(order_id)) {
            const order = await Order.findOne({ _id: order_id })
            if (order) {
                const carts = order.carts
                carts.forEach(async(cart) => {
                    await Cart.deleteOne({ _id: cart })
                });
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