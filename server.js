// -------------------------
// importing main packges
// -------------------------
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const methodOverride = require('method-override')
const {MongoStore} = require('connect-mongo')

// -------------------------
// calling the routes
// -------------------------
const authRoutes = require('./routes/auth')

// -------------------------
// loading env
// -------------------------
dotenv.config()

// creating express app
const app = express()

// -------------------------
// connecting to mongoDB
// -------------------------
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error', err)
    }
}
// starting the connecting function
connectDB()

// -------------------------
//Middlewares
// -------------------------

// reciveing the data from the form
app.use(express.urlencoded({ extended: true }))

// this allow me to replace post to make it delete or put
app.use(methodOverride('_method'))

// (CSS, JS, Images)
app.use(express.static('public'))

// this activate ejs Engine
app.set('view engine', 'ejs')

// (sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

//--------------------------
// pass user to all views
//--------------------------
const passUserToView = require('./middleware/passUserToView')
app.use(passUserToView)


// -------------------------
// linking routes
// -------------------------
app.use('/auth', authRoutes)

//----------------------------
//route subscriber to his panel
//----------------------------
const subscriberRoutes = require('./routes/subscriber')
app.use('/subscriber', subscriberRoutes)

//---------------------------
// route admin ti his dashboard
//--------------------------
const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)

// -------------------------
// route for test
// -------------------------
app.get('/', (req, res) => {
    // If user is logged in
    if (req.session.user) {

        // Admin user
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard')
        }
        // Subscriber user
        if (req.session.user.role === 'subscriber') {
            return res.redirect('/subscriber/dashboard')
        }
    }
    // not logged in
    res.render('index')
})


// -------------------------
//runing the server
// -------------------------
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})
