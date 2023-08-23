const mongoose = require('mongoose')


const ProductCatagoryRatingSchema = new mongoose.Schema({
    product_catagory_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'product_catagorys'
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
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

module.exports = mongoose.model('product_catagory_ratings', ProductCatagoryRatingSchema)