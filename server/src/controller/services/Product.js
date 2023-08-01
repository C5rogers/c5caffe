// .populate('products')
// .populate('publisher', 'companyName -_id')
const Product = require('../../database/schemas/Product')
const Catagory = require('../../database/schemas/ProductCatagory')
const { isValidObjectId } = require('mongoose')
const path = require('path')


module.exports.Products_get = async(req, res) => {
    try {
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
        const preExistedCatagory = await Catagory.findOne({ $or: [{ catagory }] })
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