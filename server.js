//================= DEPENDENCIES =================//
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection;
const session = require('express-session')
const bcrypt = require('bcrypt')

//================= PORT =================//
const PORT = process.env.PORT || 3000

//================= DATABASE =================//
const MONGODB_URI = 'mongodb://heroku_2wm3xvfz:h9vpt2cja5mrs56ud0s52e5jgj@ds227853.mlab.com:27853/heroku_2wm3xvfz' || process.env.MONGODB_URI || 'mongodb://localhost/' + 'maraudersApp'
//================= HEROKU =================//
const uri = 'mongodb://emfoxily:thG482n7dp6dvMD@ds227853.mlab.com:27853/heroku_2wm3xvfz'

//================= CONNECT TO MONGO & HEROKU =================//
mongoose.connect(uri, { useNewUrlParser: true })

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

//================= ERROR / SUCCESS =================//
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//================= OPEN =================//
db.on('open', () => {
  console.log('Mischief Managed.');
})

//================= MIDDLEWARE =================//
// use public folder for static assets
app.use(express.static('public'))

// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended: false}))

// use method override!
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))

// use express session!
app.use(session({
  secret: "mischiefmanaged",
  resave: false,
  saveUninitialized: false,
}))

// app.use((req, res) => {
//   res.locals.session = req.session
// })

//================= CONTROLLERS =================//
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const storeController = require('./controllers/store.js')
app.use('/', storeController)

//================= LISTEN =================//
app.listen(PORT, () => {
  console.log('I solemnly swear that I am up to no good...');
})
