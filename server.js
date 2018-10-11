// dependencies!
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection;

// port!
const PORT = process.env.PORT || 3000

// database!
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'maraudersApp'

// connect to mongo!
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open', () => {
  console.log('Mischief Managed.');
})

// middleware
// use public folder for static assets
app.use(express.static('public'))

// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended: false}))

// use method override
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))

// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// listen
app.listen(PORT, () => {
  console.log('I solemnly swear that I am up to no good...');
})
