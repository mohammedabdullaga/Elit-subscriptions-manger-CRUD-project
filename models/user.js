const { Timestamp } = require("bson")

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
{
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'subscriber' // Users are defualt to subscribers now as zainab instructed
    },
    password: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

const User = mongoose.model('User', userSchema)
module.exports = User
