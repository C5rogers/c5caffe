const mongoose = require('mongoose')
const User = require('./User')
const sendEmail = require('../../utils/email/sendEmail')


const ProductCatagorySchema = new mongoose.Schema({
    catagory: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    average_rating: {
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

ProductCatagorySchema.post('save', async(catagory) => {
    const allUsers = await User.find({})
    allUsers.forEach(async(user) => {
        if (user.roll == 'user') {
            await sendEmail(user.email, 'New Product Catagory Is Posted In C5 Online Caffe', { name: user.username }, './template/checkoutNewProductCatagory.handlebars')
        }
    });
})

module.exports = mongoose.model('product_catagorys', ProductCatagorySchema)