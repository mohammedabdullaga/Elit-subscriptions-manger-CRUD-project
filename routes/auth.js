const express = require('express')
const router = express.Router()

// iwill import the functions from authController
const {signupForm, signup, loginForm, login, logout} = require('../controllers/authController')

// building router here:

// route responsible for getting the form for sign up
router.get('/signup', signupForm)
//route responsible for posting the recived data from form
router.post('/signup', signup)
// route for sign in
router.get('/login', loginForm)
// processing the log in
router.post('/login', login)
// log out
router.get('/logout', logout)
// exporting the module
module.exports = router
