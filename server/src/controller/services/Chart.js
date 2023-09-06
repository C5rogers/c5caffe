const aggregate = require('../../utils/aggregates')

module.exports.Chart_data_get = async(req, res) => {
    try {
        const users_signedup_perweek = await aggregate.getUserAggregate()
        const orders_per_week = await aggregate.getOrderAggregate()
        const cart_usage = await aggregate.getCartUsage()
        const product_rating_rate = await aggregate.getProductRatingRate()
        const product_catagory_rating_rate = await aggregate.getProductCatagoryRatingRate()
        const selled_order_report = await aggregate.getSelledOrderData()
        const product_uploading_rate = await aggregate.productUploadRate()
        return res.status(200).json({ product_uploading_rate, users_signedup_perweek, orders_per_week, cart_usage, product_rating_rate, product_catagory_rating_rate, selled_order_report })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}