const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true
    },
    subscriptionName: {
      type: String,
      required: true
    },
    packageDuration: {
      type: String,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Subscription', subscriptionSchema)
