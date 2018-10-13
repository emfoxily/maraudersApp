const express = require('express')
const bcrypt = require('bcrypt')
const store = express.Router()
const Socks = require('../models/sockSchema.js')
const sockSeed = require('../models/socks.js')
const Wands = require('../models/wandSchema.js')
const wandSeed = require('../models/wands.js')
const Users = require('../models/userSchema.js')
const wizardSeed = require('../models/wizards.js')

// routes!
// index
store.get('/', (req, res) => {
  if (req.session.currentUser) {
    Wands.find({}, (error, allWands) => {
      res.render('index.ejs', {
        wands: allWands,
        currentUser: req.session.currentUser,
        isWizard: req.session.currentUser.isWizard
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
//   // seeds the data
//   Users.create(wizardSeed, (err, createdUsers) => {
//     // logs created users
//     console.log(createdUsers);
//     // redirects
//     res.redirect('/');
//   });
// });

// create!
store.get('/create', (req, res) => {
  res.render('socks/create.ejs')
})

store.post('/', (req, res) => {
  Socks.create(req.body, (error, createdItem) => {
    res.redirect('/')
  })
})

// show!
store.get('/:id', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render('socks/show.ejs', {
      sock: foundSock
    })
  })
})

// delete!
store.delete('/:id', (req, res) => {
  Socks.findByIdAndRemove(req.params.id, (error, data)=> {
    res.redirect('/')
  })
})

// edit!
store.get('/:id/edit', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render(
      'socks/update.ejs',
      {
        sock: foundSock
      }
    )
  })
})

store.put('/:id', (req, res) => {
  Socks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
    res.redirect('/')
  })
})

module.exports = store
