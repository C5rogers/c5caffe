const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender: {
        type: mongoose.SchemaTypes.String,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    phone: {
        type: mongoose.SchemaTypes.String,
    },
    location: {
        type: mongoose.SchemaTypes.String,
    },
    password: {
        type: mongoose.SchemaTypes.String,
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
        default: new Date()
    },
    updated_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
})


module.exports = mongoose.model('users', UserSchema)