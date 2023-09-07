const mongoose = require('mongoose')
const sendEmail = require('../../utils/email/sendEmail')
const User = require('./User')

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
    average_rating: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0,
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

ProductSchema.post('save', async(product) => {
    const allUsers = await User.find({})
    allUsers.forEach(async(user) => {
        if (user.roll == 'user') {
            await sendEmail(user.email, 'New Product Is Posted In C5 Online Caffe', { name: user.username }, './template/checkoutNewProductAlert.handlebars')
        }
    });
})

module.exports = mongoose.model('products', ProductSchema)