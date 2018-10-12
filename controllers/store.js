const express = require('express')
const store = express.Router()
const Socks = require('../models/sockSchema.js')
const sockSeed = require('../models/socks.js')
const Wands = require('../models/wandSchema.js')
const wandSeed = require('../models/wands.js')
const Users = require('../models/userSchema.js')
const wizardSeed = require('../models/wizards.js')

// routes!
// index / sock store!
store.get('/', (req, res) => {
  // if (req.sessions.currentUser) {
  //   Wands.find({}, (error, allWand) => {
  //     res.render('index.ejs', {
  //       wands: allWands
  //     })
  //   })
  // } else {
    Socks.find({}, (error, allSocks) => {
      res.render('index.ejs', {
        socks: allSocks,
        // currentUser: req.sessions.currentUser
      })
    })
  // }
})

// Socks.create( sockSeed, (error, data) => {
//   if (error) console.log(error.message);
//   console.log('added sock data');
// })

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
