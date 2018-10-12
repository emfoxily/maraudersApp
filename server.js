// dependencies!
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection;
const session = require('express-session')
const Socks = require('./models/sockSchema.js')
const sockSeed = require('./models/socks.js')

// port!
const PORT = process.env.PORT || 3000

// database!
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'maraudersApp'

// connect to mongo!
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// error / success!
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo!
db.on('open', () => {
  console.log('Mischief Managed.');
})

// middleware!
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
  saveUninitialized: false
}))

// routes!
// index / sock store!
app.get('/', (req, res) => {
  // if the current user is a wizard, show wand shop
  if (req.session.currentUser) {
    Wands.find({}, (error, allWands) => {
      res.render('wandShop/index.ejs')
    })
  } else {
  // else, show the sock shop
    Socks.find({}, (error, allSocks) => {
      res.render('index.ejs', {
        socks: allSocks
      })
    })
  }
})

// Socks.create( sockSeed, (error, data) => {
//   if (error) console.log(error.message);
//   console.log('added sock data');
// })

// show!
app.get('/:id', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render('socks/show.ejs', {
      sock: foundSock
    })
  })
})

// edit!
app.put('/:id', (req, res) => {
  Socks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
    res.redirect('/')
  })
})

app.get('/:id/edit', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render(
      'socks/update.ejs',
      {
        sock: foundSock
      }
    )
  })
})

// listen!
app.listen(PORT, () => {
  console.log('I solemnly swear that I am up to no good...');
})
