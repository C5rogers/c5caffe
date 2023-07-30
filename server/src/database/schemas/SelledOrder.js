const mongoose = require('mongoose')

const SelledOrdersSchma = new mongoose.Schema({
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
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    total_price: {
        type: mongoose.SchemaTypes.Number,
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

module.exports = mongoose.model('selled_orders', SelledOrdersSchma)