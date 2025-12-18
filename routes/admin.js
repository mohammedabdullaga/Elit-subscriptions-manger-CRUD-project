const express = require('express')
const router = express.Router()

const requireLogin = require('../middleware/requireLogin')
const requireAdmin = require('../middleware/requireAdmin')
const Subscription = require('../models/subscription')

const {
    newSubscriptionForm,
    createSubscription
} = require('../controllers/subscriptionController')


// ==========================
// Admin Dashboard
// ==========================
router.get('/dashboard', requireLogin, requireAdmin, (req, res) => {
    res.render('admin/dashboard')
})


// ==========================
// Add New Subscription
// ==========================
router.get('/subscriptions/new', requireLogin, requireAdmin, newSubscriptionForm)

router.post('/subscriptions', requireLogin, requireAdmin, createSubscription)


// ==========================
// Search + Sorting Subscriptions
// ==========================
router.get('/subscriptions', requireLogin, requireAdmin, async (req, res) => {
    try {
        const { phone, sort } = req.query;

        if (!phone) {
            return res.send('Please provide a phone number');
        }

        let sortOption = {}

        if (sort === 'recent') {
            sortOption = { createdAt: -1 }
        }

        if (sort === 'expiry') {
            sortOption = { expiryDate: 1 }
        }

        const subscriptions = await Subscription
            .find({ phone })
            .sort(sortOption)

        res.render('admin/subscriptions', {
            phone,
            subscriptions,
            sort
        })

    } catch (err) {
        res.send('Error: ' + err.message)
    }
});


// ==========================
// Edit Subscription (Form)
// ==========================
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


// ==========================
// Update Subscription
// ==========================
router.put('/subscriptions/:id', requireLogin, requireAdmin, async (req, res) => {
    try {
        const {
            phone,
            subscriptionName,
            packageDuration,
            expiryDate,
            notes
        } = req.body

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


// ==========================
// Delete Subscription
// ==========================
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
