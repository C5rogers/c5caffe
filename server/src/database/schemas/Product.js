const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
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