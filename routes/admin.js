const express = require('express')
const router = express.Router()

const requireLogin = require('../middleware/requireLogin')
const requireAdmin = require('../middleware/requireAdmin')

// Admin dashboard page
router.get('/dashboard', requireLogin, requireAdmin, (req, res) => {
    res.render('admin/dashboard')
})

module.exports = router
