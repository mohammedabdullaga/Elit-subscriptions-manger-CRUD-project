const express = require('express')
const router = express.Router()

const requireLogin = require('../middleware/requireLogin')
const requireSubscriber = require('../middleware/requireSubscriber')

// showing the subscriber panel
router.get('/dashboard', requireLogin, requireSubscriber, (req, res) => {
    res.render('subscriber/dashboard')
})

module.exports = router