const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    packageType: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Subscription = mongoose.model("Subscription", subscriptionSchema)

module.exports = Subscription
