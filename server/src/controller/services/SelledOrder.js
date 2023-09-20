const SelledOrder = require('../../database/schemas/SelledOrder')
const { isValidObjectId } = require('mongoose')
const { getIdFromToken } = require('../../utils/jwt')
const User = require('../../database/schemas/User')
const Cart = require('../../database/schemas/Cart')
const Product = require('../../database/schemas/Product')

module.exports.Selled_orders_get = async(req, res) => {
    try {
        const { q } = req.query
        let page = req.query.page
        let limit = req.query.limit
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 15
        }
        let selled_orders
        if (q) {
            //filter selled_order 
            //check if the query is number or not
            const number = Number(q)
            if (isNaN(number)) {
                const regexQuery = RegExp(q, 'i')
                selled_orders = await SelledOrder.find({
                    $or: [
                        { status: regexQuery },
                        {
                            user: {
                                $in: await User.find({
                                    $or: [
                                        { username: regexQuery },
                                        { email: regexQuery },
                                        { gender: regexQuery },
                                        { location: regexQuery }
                                    ]
                                }).distinct('_id')
                            }
                        }, {
                            carts: {
                                $in: await Cart.find({
                                    status: regexQuery
                                }).distinct('_id')
                            }
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
            } else {
                selled_orders = await SelledOrder.find({
                    $or: [
                        { total_price: number },
                        {
                            carts: {
                                $in: await Cart.find({
                                    $or: [
                                        { ammount: number },
                                        { overall_price: number }
                                    ]
                                }).distinct('_id')
                            }
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
            }
        } else {
            selled_orders = await SelledOrder.find({}).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("carts")
        }
        const selled_order_counts = await SelledOrder.find({}).count()
        const total_pages = Math.ceil(selled_order_counts / limit)
        return res.status(200).json({ selled_orders, selled_order_counts, total_pages, current_page: page })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Selled_order_mine_get = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const selled_order = await SelledOrder.find({ user_id }).populate("user", "_id username gender location profile").populate("carts")
        return res.status(200).json(selled_order)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Selled_order_get = async(req, res) => {
    try {
        const selled_order_id = req.params.id
        if (isValidObjectId(selled_order_id)) {
            const selled_order = await SelledOrder.findOne({ _id: selled_order_id }).populate("user", "_id username gender location profile").populate("carts")
            return res.status(200).json(selled_order)
        } else {
            return res.status(400).json({ message: "Invalid selled order id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Selled_order_delete = async(req, res) => {
    try {
        const selled_order_id = req.params.id
        if (isValidObjectId(selled_order_id)) {
            await SelledOrder.deleteOne({ _id: selled_order_id })
            return res.status(200).json({ message: "Selled order deleted successfully" })
        } else {
            return res.status(400).json({ message: "Invalid selled order id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}