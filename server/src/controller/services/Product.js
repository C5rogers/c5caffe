// .populate('products')
// .populate('publisher', 'companyName -_id')
const Product = require('../../database/schemas/Product')
const Catagory = require('../../database/schemas/ProductCatagory')
const { isValidObjectId } = require('mongoose')
const path = require('path')
const fs = require('fs')


module.exports.Products_get = async(req, res) => {
    try {
        //there is an error in populating the product_catagorys document
        const products = await Product.find({}).populate("product_catagorys")
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Product_get = async(req, res) => {
    try {
        const product_id = req.params.id
        if (isValidObjectId(product_id)) {
            //same as the above
            const product = await Product.findOne({ _id: product_id }).populate("product_catagorys")
            return res.status(200).json(product)
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
        const { name, price, catagory } = req.body
        const parsedPrice = Number(price)
        const image = req.file
        let filename = image.filename
        let filepath = path.join(__dirname, '/public/products/images', filename)
        const preExistedCatagory = await Catagory.findOne({ catagory })
        if (preExistedCatagory) {
            const newProduct = await Product.create({ name, price: parsedPrice, catagory: preExistedCatagory, image: filepath })
            return res.status(201).json(newProduct)
        } else {
            const newCatagory = await Catagory.create({ catagory })
            const newProduct = await Product.create({ name, price: parsedPrice, catagory: newCatagory, image: filepath })
            return res.status(201).json(newProduct)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.Product_edit = async(req, res) => {
    try {
        const { name, price, catagory } = req.body
        const file = req.file
        let filename = file.filename
        let filepath = path.join(__dirname, '/public/products/images', filename)
        const product_id = req.params.id
        const theProduct = await Product.findOne({ _id: product_id })
        if (theProduct) {
            //there is an error in deleting the image right here
            fs.unlink(theProduct.image)
            const preExistedCatagory = await Catagory.findOne({ catagory })
            if (preExistedCatagory) {
                await theProduct.updateOne({ name, price, catagory: preExistedCatagory, image: filepath })
                return res.status(200).json({ message: "Product updated successfully", product: theProduct })
            } else {
                const newCatagory = await Catagory.create({ catagory })
                await theProduct.updateOne({ name, price, catagory: newCatagory, image: filepath })
                res.status(200).json({ message: "Product updated successfully", product: theProduct })
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

}


// const House = mongoose.model("House", houseSchema)

// // Create a Owner
// const alex = await Owner.create({name: "Alex Merced"})

// // Create a new house
// House.create({
//     street: "100 Maple Street",
//     city: "Fort Townville,
//     state: "New West Virgota",
//     zip: "77777"
//     owner: alex
// })

// // query for all houses, use populate to include owner info
// House.find({}).populate("owner")