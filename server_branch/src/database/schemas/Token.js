const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
    },
    token: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        default: new Date(),
        expires: 3600,
    }
})

module.exports = mongoose.model('tokens', tokenSchema)