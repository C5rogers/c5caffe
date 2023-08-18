const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        required: true,
    },
    ammount: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "unordered"
    },
    overall_price: {
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

module.exports = mongoose.model("carts", CartSchema)