const User = require('../models/user')
const Subscription = require('../models/subscription')

module.exports.newSubscriptionForm = async (req, res) => {
    try {
        const subscribers = await User.find({role: 'subscriber'})
        res.render('admin/new-subscription', { subscribers })
    } catch (err) {
        res.send('Error: ' + err.message)
    }
}

module.exports.createSubscription = async (req, res) => {
    try {
        const {
            phone,
            subscriptionName,
            packageDuration,
            expiryDate,
            notes
        } = req.body
        await Subscription.create({
            phone,
            subscriptionName,
            packageDuration,
            expiryDate,
            notes
        })
        res.send('Subscription added successfully')

    } catch (err) {
        res.send('Error: ' + err.message)
    }
}