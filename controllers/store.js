// dependencies!
const express = require('express')
const bcrypt = require('bcrypt')
const store = express.Router()

// seeds & schemas!
const Socks = require('../models/sockSchema.js')
const sockSeed = require('../models/socks.js')
const Wands = require('../models/wandSchema.js')
const wandSeed = require('../models/wands.js')
const User = require('../models/userSchema.js')
const wizardSeed = require('../models/wizards.js')

// routes!
// index
store.get('/', (req, res) => {
  if (req.session.currentUser) {
    Wands.find({}, (error, allWands) => {
      res.render('index.ejs', {
        wands: allWands,
        currentUser: req.session.currentUser
      })
    })
  } else {
    Socks.find({}, (error, allSocks) => {
      res.render('index.ejs', {
        socks: allSocks,
        currentUser: req.session.currentUser
      })
    })
  }
})

// Socks.create( sockSeed, (error, data) => {
//   if (error) console.log(error.message);
//   console.log('added sock data');
// })
//
// Wands.create( wandSeed, (error, data) => {
//   if (error) console.log(error.message);
//   console.log('added wand data');
// })
//
// store.get('/seedWizards', (req, res) => {
//   // encrypts passwords
//   wizardSeed.forEach((user) => {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   });
//   // creates users using the wizard seed
//   Users.create(wizardSeed, (err, createdUsers) => {
//     // logs created users
//     console.log(createdUsers);
//     // redirects
//     res.redirect('/');
//   });
// });

// create!
store.get('/create', (req, res) => {
  if (req.session.currentUser) {
    res.render('wands/create.ejs')
  } else {
    res.render('socks/create.ejs')
  }
})

store.post('/', (req, res) => {
  if (req.session.currentUser) {
    Wands.create(req.body, (error, createdWand) => {
      res.redirect('/')
    })
  } else {
    Socks.create(req.body, (error, createdSock) => {
      res.redirect('/')
    })
  }
})

// show!
store.get('/:id', (req, res) => {
  if (req.session.currentUser) {
    Wands.findById(req.params.id, (error, foundWand) => {
      res.render('wands/show.ejs', {
        wand: foundWand
      })
    })
  } else {
    Socks.findById(req.params.id, (error, foundSock) => {
      res.render('socks/show.ejs', {
        sock: foundSock
      })
    })
  }
})

// delete!
store.delete('/:id', (req, res) => {
  if (req.session.currentUser) {
    Wands.findByIdAndRemove(req.params.id, (error, data) => {
      res.redirect('/')
    })
  } else {
    Socks.findByIdAndRemove(req.params.id, (error, data)=> {
      res.redirect('/')
    })
  }
})

// edit!
store.get('/:id/edit', (req, res) => {
  if (req.session.currentUser) {
    Wands.findById(req.params.id, (error, foundWand) => {
      res.render('wands/update.ejs', {
        wand: foundWand
      })
    })
  } else {
    Socks.findById(req.params.id, (error, foundSock) => {
      res.render('socks/update.ejs', {
          sock: foundSock
        }
      )
    })
  }
})

store.put('/:id', (req, res) => {
  if (req.session.currentUser) {
    Wands.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
      res.redirect('/')
    })
  } else {
    Socks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
      res.redirect('/')
    })
  }
})

module.exports = store
