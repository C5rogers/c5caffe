const mongoose = require('mongoose')


const ProductCatagoryRatingSchema = new mongoose.Schema({
    product_catagory_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
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