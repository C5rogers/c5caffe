const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    catagory: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'product_catagorys',
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

module.exports = mongoose.model('products', ProductSchema)