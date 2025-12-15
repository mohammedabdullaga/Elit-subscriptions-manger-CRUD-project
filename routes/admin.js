const express = require('express')
const router = express.Router()

const requireLogin = require('../middleware/requireLogin')
const requireAdmin = require('../middleware/requireAdmin')
const Subscription = require('../models/subscription')

// Admin dashboard page
router.get('/dashboard', requireLogin, requireAdmin, (req, res) => {
    res.render('admin/dashboard')
})

const { newSubscriptionForm, createSubscription } = require('../controllers/subscriptionController')

// Show form to add subscription for a user
router.get('/subscriptions/new', requireLogin, requireAdmin, newSubscriptionForm)

router.post('/subscriptions', requireLogin, requireAdmin, createSubscription)

router.get('/subscriptions', requireLogin, requireAdmin, async (req, res) => {
    try {
        const { phone } = req.query
        if (!phone) {
            return res.send('Please provide a phone number')
        }
        const subscriptions = await Subscription.find({ phone })
        console.log({phone})
        res.render('admin/subscriptions', {
            phone,
            subscriptions
        })

    } catch (err) {
        res.send('Error: ' + err.message)
    }
})
// edit subscriptions 
router.get('/subscriptions/:id/edit', requireLogin, requireAdmin, async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id)

        if (!subscription) {
            return res.send('Subscription not found')
        }

        res.render('admin/edit-subscription', { subscription })

    } catch (err) {
        res.send('Error: ' + err.message)
    }
})

// Update subscription
router.put('/subscriptions/:id', requireLogin, requireAdmin, async (req, res) => {
    try {
        const { phone, subscriptionName, packageDuration, expiryDate, notes } = req.body

        await Subscription.findByIdAndUpdate(req.params.id, {
            phone,
            subscriptionName,
            packageDuration,
            expiryDate,
            notes
        })

        res.redirect(`/admin/subscriptions?phone=${phone}`)

    } catch (err) {
        res.send('Error: ' + err.message)
    }
})


// Delete subscription
router.delete('/subscriptions/:id', requireLogin, requireAdmin, async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id)

        if (!subscription) {
            return res.send('Subscription not found')
        }

        const phone = subscription.phone

        await Subscription.findByIdAndDelete(req.params.id)

        res.redirect(`/admin/subscriptions?phone=${phone}`)

    } catch (err) {
        res.send('Error: ' + err.message)
    }
})


module.exports = router
