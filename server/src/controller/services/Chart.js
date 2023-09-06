const aggregate = require('../../utils/aggregates')
const Product = require('../../database/schemas/Product')
const User = require('../../database/schemas/User')
const ProductRating = require('../../database/schemas/ProductRating')
const ProductCatagoryRating = require('../../database/schemas/ProductCatagoryRating')
const ProductCatagory = require('../../database/schemas/ProductCatagory')

module.exports.Chart_data_get = async(req, res) => {
    try {

        const products = await Product.find({}).count()
        const users = await User.find({}).count()
        const product_ratings = await ProductRating.find({}).count()
        const Product_catagory_ratings = await ProductCatagoryRating.find({}).count()
        const product_catagorys = await ProductCatagory.find({}).count()

        const users_signedup_perweek = await aggregate.getUserAggregate()
        const orders_per_week = await aggregate.getOrderAggregate()
        const cart_usage = await aggregate.getCartUsage()
        const product_rating_rate = await aggregate.getProductRatingRate()
        const product_catagory_rating_rate = await aggregate.getProductCatagoryRatingRate()
        const selled_order_report = await aggregate.getSelledOrderData()
        const product_uploading_rate = await aggregate.productUploadRate()
        return res.status(200).json({ products, users, product_catagorys, Product_catagory_ratings, product_ratings, product_uploading_rate, users_signedup_perweek, orders_per_week, cart_usage, product_rating_rate, product_catagory_rating_rate, selled_order_report })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}