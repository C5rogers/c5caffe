const mongoose = require('mongoose')

const ProductCatagorySchema = new mongoose.Schema({
    product_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    catagory: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('product_catagorys', ProductCatagorySchema)