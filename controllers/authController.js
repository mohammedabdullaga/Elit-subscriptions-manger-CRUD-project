const User = require('../models/user')
const bcrypt = require('bcrypt')

//sign up form
module.exports.signupForm = (req, res) => {
    res.render('auth/signup')
}

// create user
module.exports.signup = async (req, res) => {
    try {
        const {phone, password, confirmPassword} = req.body
        if (password !== confirmPassword) {
            return res.render('auth/signup', {
        error: 'Passwords do not match'
      })
        }
        const userInDatabase = await User.findOne({ phone })
        if (userInDatabase) {
            return res.render('auth/signup', {
        error: 'Phone number is already registered'
      })
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        await User.create ({
            phone,
            password: hashedPassword
        })
        res.send('User created successfully')
    } catch (err) {
        res.send('error: ' + err.message)
    }
}

//Login page rendreing
module.exports.loginForm = (req,res) => {
    res.render('auth/login')
}

//login proccesing logic with session mange
module.exports.login = async (req,res) => {
    try {
        const {phone, password} = req.body
        //im checking if the user phone is exist or no
        const user = await User.findOne({phone})
        if (!user) {
            return res.render('auth/login', {
        error: 'Invalid phone or password'
      })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.render('auth/login', {
        error: 'Invalid phone or password'
      })
        }
        req.session.user = {
            _id: user._id,
            phone: user.phone,
            role: user.role
        }
        req.session.save(() => {
            if(user.role === 'admin') {
                return res.redirect('/admin/dashboard')
            } else {
                return res.redirect('/subscriber/dashboard')
            }
        })
    } catch (err) {
        res.send('Error: ' + err.message)
    }
}

module.exports.logout = (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/')
        })
    } catch (err) {
        res.send("Error: " + err.message)
    }
}