const Catagory = require('../../database/schemas/ProductCatagory')
const Product = require('../../database/schemas/Product')
const { isValidObjectId } = require('mongoose')
const CatagoryRating = require('../../database/schemas/ProductCatagoryRating')


module.exports.Catagorys_get = async(req, res) => {
    try {
        const { q } = req.query
        let catagorys
        if (q) {
            const isNumber = Number(q)
            if (isNaN(isNumber)) {
                const regexQuery = new RegExp(q, 'i')
                catagorys = await Catagory.find({
                    $or: [
                        { catagory: regexQuery }
                    ]
                })
            } else {
                catagorys = await Catagory.find({
                    $or: [
                        { average_rating: isNumber }
                    ]
                })
            }
        } else {
            catagorys = await Catagory.find({})
        }
        const catagory_ratings = await CatagoryRating.find({}).populate('product_catagory_id').populate('user_id', '_id username gender email phone location profile roll created_at updated_at')
        return res.status(200).json({ catagorys, catagory_ratings })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Catagory_get = async(req, res) => {
    try {
        const catagory_id = req.params.id
        if (isValidObjectId(catagory_id)) {
            const catagory = await Catagory.findOne({ _id: catagory_id })
            const catagory_rating = await CatagoryRating.findOne({ product_catagory_id: catagory_id }).populate('product_catagory_id').populate('user_id', '_id username gender email phone location profile roll created_at updated_at')
            return res.status(200).json({ catagory, catagory_rating })
        } else {
            return res.status(400).json({ message: "Invalid catagory id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Catagory_create = async(req, res) => {
    try {
        const { catagory } = req.body
        const dbCatagory = await Catagory.find({ catagory })
        if (dbCatagory.length > 0) {
            const errors = {}
            errors.catagory = "The catagory is already exist"
            return res.status(400).json(errors)
        } else {
            const new_catagory = await Catagory.create({ catagory })
            return res.status(201).json({ message: "Catagory created successfully", new_catagory })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Catagory_edit = async(req, res) => {
    try {
        const catagory_id = req.params.id
        const { catagory } = req.body
        if (isValidObjectId(catagory_id)) {
            const theCatagory = await Catagory.findOne({ _id: catagory_id })
            if (theCatagory) {
                const preExisted = await Catagory.findOne({ catagory })
                if (preExisted) {
                    return res.status(400).json({ message: "There is pre existing catagory with this name" })
                } else {
                    await theCatagory.updateOne({ catagory })
                    const updated_catagory = await Catagory.findOne({ _id: catagory_id })
                    return res.status(200).json({ message: "The catagory updated successfully", updated_catagory })
                }
            } else {
                return res.status(400).json({ message: "There is no catagory with this specific id" })
            }
        } else {
            return res.status(400).json({ message: "Invalid catagory id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
module.exports.Catagory_delete = async(req, res) => {
    try {
        const catagory_id = req.params.id
        if (isValidObjectId(catagory_id)) {
            const theCatagory = await Catagory.findOne({ _id: catagory_id })
            if (theCatagory) {
                const currentlyUsingProduct = await Product.find({
                    catagory: {
                        $in: await Catagory.find({
                            _id: catagory_id
                        }).distinct('_id')
                    }
                })
                if (currentlyUsingProduct.length > 0) {
                    return res.status(400).json({ message: "Can't delete catagory, it is currently in use!" })
                } else {
                    await Catagory.deleteOne({ _id: catagory_id })
                    return res.status(200).json({ message: "Catagory deleted successfully" })
                }
            } else {
                return res.status(400).json({ message: "There is no catagory with this id" })
            }
        } else {
            return res.status(400).json({ message: "Invalid catagory id" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}