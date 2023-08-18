const ProductCatagoryRating = require('../../database/schemas/ProductCatagoryRating')
const ProductRating = require('../../database/schemas/ProductRating')
const ProductCatagory = require('../../database/schemas/ProductCatagory')
const Product = require('../../database/schemas/Product')
const User = require('../../database/schemas/User')
const { getIdFromToken } = require('../../utils/jwt')
const { isValidObjectId } = require('mongoose')



module.exports.Product_like = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_id = req.params.id
        if (isValidObjectId(product_id)) {
            const user = await User.findOne({ _id: user_id })
            const product = await Product.findOne({ _id: product_id })
            if (user && product) {
                const preRatedProduct = await ProductRating.findOne({ $and: [{ user_id: user, product_id: product }] }).populate("product_id")
                if (preRatedProduct) {
                    return res.status(400).json({ message: "You already rate this product" })
                } else {
                    await product.updateOne({ rating: product.rating + 1 })
                    const updatedProduct = await Product.findOne({ _id: product_id })
                    const rating = await ProductRating.create({ user_id: user, product_id: updatedProduct })
                    return res.status(201).json({ message: "Product is liked successfully", rating })
                }
            } else {
                return res.status(400).json({ error: "Invalid request" })
            }
        } else {
            return res.status(400).json({ error: "Invalid product id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Product_dislike = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_id = req.params.id
        if (isValidObjectId(product_id)) {
            const user = await User.findOne({ _id: user_id })
            const product = await Product.findOne({ _id: product_id })
            if (user && product) {
                const ratedProduct = await ProductRating.findOne({ $and: [{ user_id: user }, { product_id: product }] }).populate("product_id")
                if (ratedProduct) {
                    await product.updateOne({ rating: product.rating - 1 })
                    const updated_product = await Product.findOne({ _id: product_id })
                    await ProductRating.deleteOne({ _id: ratedProduct._id })
                    return res.status(200).json({ message: "Product disliked successfully", updated_product })
                } else {
                    return res.status(400).json({ message: "The product is not rated at all" })
                }
            } else {
                return res.status(400).json({ error: "Invalid request" })
            }
        } else {
            return res.status(400).json({ error: "Invalid product id" })
        }
    } catch (error) {
        console.log("error: " + error)
    }
}
module.exports.Product_catagory_like = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_catagory_id = req.params.id
        if (isValidObjectId(product_catagory_id)) {
            const user = User.findOne({ _id: user_id })
            const product_catagory = ProductCatagory.findOne({ _id: product_catagory_id })
            if (user && product_catagory) {
                const pre_rated_product_catagory = await ProductCatagoryRating.findOne({ product_catagory_id, user_id })
                if (pre_rated_product_catagory) {
                    return res.status(400).json({ message: "You almost rated this product cataogory" })
                } else {
                    await product_catagory.updateOne({ rating: product_catagory.rating + 1 })
                    const updated_product_catagory = await ProductCatagory.findOne({ _id: product_catagory_id })
                    const product_catagory_rating = await ProductCatagoryRating.create({ product_catagory_id: updated_product_catagory, user_id: user })
                    return res.status(201).json({ message: "Product catagory liked successfully", product_catagory_rating })
                }
            } else {
                return res.status(400).json({ message: "Invalid request" })
            }
        } else {
            return res.status(400).json({ message: "Invalid product catagory id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Product_catagory_dislike = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_catagory_id = req.params.id
        if (isValidObjectId(product_catagory_id)) {
            const user = User.findOne({ _id: user_id })
            const product_catagory = ProductCatagory.findOne({ _id: product_catagory_id })
            if (user && product_catagory) {
                const rated_product_catagory = await ProductCatagoryRating.findOne({ product_catagory_id, user_id })
                if (rated_product_catagory) {
                    await product_catagory.updateOne({ rating: product_catagory.rating - 1 })
                    const updated_product_catagory = await ProductCatagory.findOne({ _id: product_catagory_id })
                    await ProductCatagoryRating.deleteOne({ $and: [{ product_catagory_id, user_id }] })
                    return res.status(200).json({ message: "Product catagory rated successfully" }, updated_product_catagory)
                } else {
                    return res.status(400).json({ message: "You did't rate this product catagory before" })
                }
            } else {
                return res.status(400).json({ message: "Invalid request" })
            }
        } else {
            return res.status(400).json({ message: "Invalid product catagory id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}