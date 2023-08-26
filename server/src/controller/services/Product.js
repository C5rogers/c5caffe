const Product = require('../../database/schemas/Product')
const Catagory = require('../../database/schemas/ProductCatagory')
const { isValidObjectId } = require('mongoose')
const path = require('path')
const fs = require('fs').promises
const dotenv = require('dotenv').config('../../../.env')
const ProductRating = require('../../database/schemas/ProductRating')
const SelledOrder = require('../../database/schemas/SelledOrder')
const User = require('../../database/schemas/User')


module.exports.Products_get = async(req, res) => {
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
        let products
        if (q) {
            const price = Number(q)
            if (isNaN(price)) {
                regexQuery = new RegExp(q, 'i')
                products = await Product.find({
                    $or: [
                        { name: regexQuery },
                        { description: regexQuery },
                        {
                            catagory: {
                                $in: await Catagory.find({
                                    catagory: regexQuery
                                }).distinct('_id')
                            }
                        }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("catagory")
            } else {
                products = await Product.find({
                    $or: [
                        { price: price },
                        { rating: price }
                    ]
                }).limit(limit * 1).skip((page - 1) * limit).populate("catagory")
            }

        } else {
            products = await Product.find({}).limit(limit * 1).skip((page - 1) * limit).populate("catagory")
        }
        const product_count = await Product.count()
        const product_ratings = await ProductRating.find({}).populate("user_id", "_id username gender location profile").populate("product_id", "_id name image price average_rating catagory")
        const selled_order_count = await SelledOrder.find({}).count()
        const users_count = await User.find({}).count()
        const total_pages = Math.ceil(product_count / limit)
        const allCatagorys = await Catagory.find({})
        const catagoryCount = await Catagory.find({}).count()
        return res.status(200).json({ products, product_ratings, total_pages, current_page: page, selled_order_count, users_count, product_catagorys: allCatagorys, product_catagorys_count: catagoryCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Product_get = async(req, res) => {
    try {
        const product_id = req.params.id
        if (isValidObjectId(product_id)) {
            const product = await Product.findOne({ _id: product_id }).populate("catagory")
            const product_rating = await ProductRating.findOne({ product_id }).populate("user_id", "_id username gender location profile").populate("product_id", "_id name image price average_rating catagory")
            return res.status(200).json({ product, product_rating })
        } else {
            return res.status(400).json({ message: "Invalid parameter" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}

module.exports.Product_create = async(req, res) => {
    try {
        const { name, price, catagory, description } = req.body
        const parsedPrice = Number(price)
        const image = req.file
        let filename = image.filename
        let filepath = 'http://localhost:4000' + '/products/images/' + filename
        const preExistedCatagory = await Catagory.findOne({ catagory })
        if (preExistedCatagory) {
            const newProduct = await Product.create({ name, price: parsedPrice, description, catagory: preExistedCatagory, image: filepath })
            return res.status(201).json(newProduct)
        } else {
            const newCatagory = await Catagory.create({ catagory })
            const newProduct = await Product.create({ name, price: parsedPrice, description, catagory: newCatagory, image: filepath })
            return res.status(201).json(newProduct)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Product_edit = async(req, res) => {
    try {
        const { name, price, catagory, description } = req.body
        const file = req.file
        let filename = file.filename
        let filepath = 'http://localhost:4000' + '/products/images/' + filename
        const product_id = req.params.id
        const theProduct = await Product.findOne({ _id: product_id })
        if (theProduct) {
            await fs.unlink(theProduct.image, (error) => {
                if (error) {
                    console.log("Error deleting the file: " + error)
                }
            })
            const preExistedCatagory = await Catagory.findOne({ catagory })
            if (preExistedCatagory) {
                await theProduct.updateOne({ name, price, description, catagory: preExistedCatagory, image: filepath })
                const updatedProduct = await Product.findOne({ _id: product_id })
                return res.status(200).json({ message: "Product updated successfully", product: updatedProduct })
            } else {
                const newCatagory = await Catagory.create({ catagory })
                await theProduct.updateOne({ name, price, description, catagory: newCatagory, image: filepath })
                const updatedProduct = await Product.findOne({ _id: product_id })
                res.status(200).json({ message: "Product updated successfully", product: updatedProduct })
            }
        } else {
            return res.status(400).json({ message: "there is no product with this id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Product_delete = async(req, res) => {
    try {
        const product_id = req.params.id
        const theProduct = await Product.findOne({ _id: product_id })
        if (theProduct) {
            await ProductRating.deleteMany({ product_id })
            await Product.deleteOne({ _id: product_id })
            await fs.unlink(theProduct.image, (error) => {
                if (error) {
                    console.log("Error in deleting the file")
                }
            })
            return res.status(200).json({ message: "Product deleted successfully" })
        } else {
            return res.status(400).json({ message: "There is no product with this id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}