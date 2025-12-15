const express = require('express')
const router = express.Router()

const requireLogin = require('../middleware/requireLogin')
const requireSubscriber = require('../middleware/requireSubscriber')
const Subscription = require('../models/subscription')

// showing the subscriber panel
router.get('/dashboard', requireLogin, requireSubscriber, async (req, res) => {
    try {
        const userPhone = req.session.user.phone

        const subscriptions = await Subscription.find({ phone: userPhone })

        res.render('subscriber/dashboard', { subscriptions })

    } catch (err) {
        res.send('Error: ' + err.message)
    }
})

module.exports = router