const SelledOrder = require('../../database/schemas/SelledOrder')
const { isValidObjectId } = require('mongoose')
const { getIdFromToken } = require('../../utils/jwt')

module.exports.Selled_orders_get = async(req, res) => {
    try {
        const selled_orders = await SelledOrder.find({}).populate("user_id", "_id username gender location profile").populate("product_id", "_id name image price rating catagory")
        const selled_order_counts = await SelledOrder.find({}).count()
        return res.status(200).json({ selled_orders, selled_order_counts })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Selled_order_mine_get = async(req, res) => {
    try {
        const token = req.cookies.jwt
        const user_id = getIdFromToken(token)
        const selled_order = await SelledOrder.find({ user_id }).populate("user_id", "_id username gender location profile").populate("product_id", "_id name image price rating catagory")
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
            const selled_order = await SelledOrder.findOne({ _id: selled_order_id }).populate("user_id", "_id username gender location profile").populate("product_id", "_id name image price rating catagory")
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