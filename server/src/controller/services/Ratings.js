const ProductCatagoryRating = require('../../database/schemas/ProductCatagoryRating')
const ProductRating = require('../../database/schemas/ProductRating')
const ProductCatagory = require('../../database/schemas/ProductCatagory')
const Product = require('../../database/schemas/Product')
const User = require('../../database/schemas/User')
const { getIdFromToken } = require('../../utils/jwt')
const { isValidObjectId } = require('mongoose')




module.exports.Product_rate = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_id = req.params.id
        const { rating_value } = req.body
        const numberValue = Number(rating_value)
        if (isNaN(numberValue)) {
            return res.status(400).json({ message: "Invalid rating value" })
        }
        if (isValidObjectId(product_id)) {
            const user = await User.findOne({ _id: user_id })
            const product = await Product.findOne({ _id: product_id })
            if (user && product) {
                const preRatedProduct = await ProductRating.findOne({ $and: [{ user_id: user, product_id: product }] }).populate("product_id")
                if (preRatedProduct) {
                    await preRatedProduct.updateOne({ rating_value: numberValue })
                    let total_rating = 0
                    let counter = 0
                    const productRatings = await ProductRating.find({ product_id: product })
                    productRatings.forEach(prod => {
                        total_rating += prod.rating_value
                        counter++
                    });
                    let average = 0
                    if (counter != 0) {
                        average = total_rating / counter
                    }
                    await product.updateOne({ average_rating: average })
                    const rating = await ProductRating.findOne({ $and: [{ user_id: user, product_id: product }] }).populate("user_id", "_id username gender location profile").populate('product_id')
                    return res.status(200).json({ message: "Product rated successfully", rating })
                } else {
                    // create new product rate
                    let rating = await ProductRating.create({ user_id: user, product_id: product, rating_value: numberValue })
                    let total_rating = 0
                    let counter = 0
                    const productRatings = await ProductRating.find({ product_id: product })
                    productRatings.forEach(prod => {
                        total_rating += prod.rating_value
                        counter++
                    });
                    let average = 0
                    if (counter != 0) {
                        average = total_rating / counter
                    }
                    await product.updateOne({ average_rating: average })
                    rating = await ProductRating.findOne({ $and: [{ user_id: user, product_id: product }] }).populate("user_id", "_id username gender location profile").populate('product_id')
                    return res.status(200).json({ message: "Product rated successfully", rating })
                }
            } else {
                return res.status(400).json({ error: "Invalid request" })
            }

        } else {
            return res.status(400).json({ error: "Invalid product id" })
        }
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({ message: "Server Error", error })
    }
}



module.exports.Product_catagory_rate = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const product_catagory_id = req.params.id
        const { rating_value } = req.body
        const numberValue = Number(rating_value)
        if (isNaN(numberValue)) {
            return res.status(400).json({ message: "Invalid rating value" })
        }
        if (isValidObjectId(product_catagory_id)) {
            const user = await User.findOne({ _id: user_id })
            const product_catagory = await ProductCatagory.findOne({ _id: product_catagory_id })
            if (user && product_catagory) {
                const rated_product_catagory = await ProductCatagoryRating.findOne({ product_catagory_id, user_id })
                if (rated_product_catagory) {
                    //update 
                    await rated_product_catagory.updateOne({ rating_value: numberValue })
                    let total_rating = 0
                    let counter = 0
                    const productCatagoryRatings = await ProductCatagoryRating.find({ product_catagory_id })
                    productCatagoryRatings.forEach(prod => {
                        total_rating += prod.rating_value
                        counter++
                    });
                    let average = 0
                    if (counter != 0) {
                        average = total_rating / counter
                    }
                    await product_catagory.updateOne({ average_rating: average })
                    const rating = await ProductCatagoryRating.findOne({ product_catagory_id, user_id }).populate("user_id", "_id username gender location profile").populate('product_catagory_id')
                    return res.status(200).json({ message: "Product catagory rated successfully", rating })
                } else {
                    //create
                    let rating = await ProductCatagoryRating.create({ user_id: user, product_catagory_id: product_catagory, rating_value: numberValue })
                    let total_rating = 0
                    let counter = 0
                    const productCatagoryRatings = await ProductCatagoryRating.find({ product_catagory_id })
                    productCatagoryRatings.forEach(prod => {
                        total_rating += prod.rating_value
                        counter++
                    });
                    let average = 0
                    if (counter != 0) {
                        average = total_rating / counter
                    }
                    await product_catagory.updateOne({ average_rating: average })
                    rating = await ProductCatagoryRating.findOne({ $and: [{ user_id: user }, { product_catagory_id }] }).populate('user_id', "_id username gender location profile").populate('product_catagory_id')
                    return res.status(201).json({ message: "Product catagory rated successfully", rating })
                }
            } else {
                return res.status(400).json({ error: "Invalid request" })
            }
        } else {
            return res.status(400).json({ message: "Invalid product catagory id" })
        }

    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({ message: "Server error", error })
    }
}