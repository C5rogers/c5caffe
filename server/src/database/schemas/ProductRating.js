const mongoose = require('mongoose')

const ProductRatingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
    },
    product_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'products'
    },
    rating_value: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 1
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

module.exports = mongoose.model('product_ratings', ProductRatingSchema)