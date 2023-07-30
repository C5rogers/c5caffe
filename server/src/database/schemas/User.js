const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    location: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    profile: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    roll: {
        type: mongoose.SchemaTypes.String,
        required: true
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


module.exports = mongoose.model('users', UserSchema)