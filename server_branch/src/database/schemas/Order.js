const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    carts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    }],
    total_price: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "unpayed"
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




module.exports = mongoose.model('orders', OrderSchema)