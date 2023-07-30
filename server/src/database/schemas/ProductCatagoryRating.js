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
    created_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date.now()
    },
    updated_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date.now()
    }
})

module.exports = mongoose.model('product_catagory_ratings', ProductCatagoryRatingSchema)