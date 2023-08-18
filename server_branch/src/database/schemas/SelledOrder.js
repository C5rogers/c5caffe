const mongoose = require('mongoose')

// const SelledOrdersSchma = new mongoose.Schema({
//     user_id: {
//         type: mongoose.SchemaTypes.ObjectId,
//         required: true,
//         ref: 'users'
//     },
//     product_id: {
//         type: mongoose.SchemaTypes.ObjectId,
//         required: true,
//         ref: 'products'
//     },
//     quantity: {
//         type: mongoose.SchemaTypes.Number,
//         required: true
//     },
//     total_price: {
//         type: mongoose.SchemaTypes.Number,
//         required: true,
//     },
//     created_at: {
//         type: mongoose.SchemaTypes.Date,
//         required: true,
//         default: new Date()
//     },
//     updated_at: {
//         type: mongoose.SchemaTypes.Date,
//         required: true,
//         default: new Date()
//     }
// })

const SelledOrdersSchma = new mongoose.Schema({
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
        default: "payed"
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