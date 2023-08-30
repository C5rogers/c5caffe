const Cart = require('../../database/schemas/Cart')
const { getIdFromToken } = require('../../utils/jwt')
const { isValidObjectId } = require('mongoose')
const User = require('../../database/schemas/User')
const Product = require('../../database/schemas/Product')
const productRating = require('../../database/schemas/ProductRating')

module.exports.Carts_get = async(req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 15
        }
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const { q } = req.query
        let carts
        if (q) {
            const isNumber = Number(q)
            if (isNaN(isNumber)) {
                carts = await Cart.find({ $and: [{ user: user_id }, { status: "unordered" }] }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("product")
            } else {
                carts = await Cart.find({
                    $and: [
                        { user: user_id },
                        { status: "unordered" },
                        {
                            $or: [
                                { ammount: isNumber },
                                { overall_price: isNumber }
                            ]
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("product")
            }
        } else {
            carts = await Cart.find({ $and: [{ user: user_id }, { status: "unordered" }] }).limit(limit * 1).skip((page - 1) * limit).populate("user", "_id username gender location profile").populate("product")
        }
        const cart_counts = await Cart.find({ $and: [{ user: user_id }, { status: "unordered" }] }).count()
        const total_pages = Math.ceil(cart_counts / limit)
        return res.status(200).json({ carts, cart_counts, total_pages, current_page: page })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}
module.exports.Cart_get = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const cart_id = req.params.id
        if (isValidObjectId(cart_id)) {
            const cart = await Cart.find({ $and: [{ _id: cart_id }, { user: user_id }, { status: "unordered" }] }).populate("user", "_id username gender location profile").populate("product")
            return res.status(200).json(cart)
        } else {
            return res.status(400).json({ message: "Invalid cart reference" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Cart_create = async(req, res) => {
    const { product_id, ammount } = req.body
    const token = req.cookies.jwt
    const user_id = getIdFromToken(token)
    try {
        if (isValidObjectId(product_id)) {
            const user = await User.findOne({ _id: user_id })
            const product = await Product.findOne({ _id: product_id })
            const parsed_ammount = Number(ammount)
            const total_price = product.price * parsed_ammount
            const newCart = await Cart.create({ user, product, ammount: parsed_ammount, overall_price: total_price })
            const createdCart = await Cart.findOne({ _id: newCart._id }).populate("user", "_id username gender location profile").populate("product")
            return res.status(201).json({ cart: createdCart })
        } else {
            return res.status(400).json({ message: "Invalid product reference" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Cart_update = async(req, res) => {
    try {
        const { ammount } = req.body
        const parsed_ammount = Number(ammount)
        if (!isNaN(parsed_ammount)) {
            const cart_id = req.params.id
            if (isValidObjectId(cart_id)) {
                const cart = await Cart.findOne({ _id: cart_id })
                const product = await Product.findOne({ _id: cart.product })
                await cart.updateOne({ ammount: parsed_ammount, overall_price: product.price * parsed_ammount })
                const updatedCart = await Cart.findOne({ _id: cart._id }).populate("user", "_id username gender location profile").populate("product")
                return res.status(200).json({ cart: updatedCart })
            } else {
                return res.status(400).json({ message: "Invalid product reference" })
            }
        } else {
            return res.status(400).json({ message: "Invalid ammount number" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}
module.exports.Cart_delete = async(req, res) => {
    try {
        const cart_id = req.params.id
        if (isValidObjectId(cart_id)) {
            await Cart.deleteOne({ _id: cart_id })
            return res.status(200).json({ message: "Cart deleted successfully" })
        } else {
            return res.status(400).json({ message: "Invalid cart reference" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Cart_favorite_products = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const favorite_products = await productRating.find({
            user_id
        }).populate({
            path: 'product_id',
            populate: {
                path: 'catagory',
                model: 'product_catagorys'
            }
        })
        return res.status(200).json(favorite_products)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}