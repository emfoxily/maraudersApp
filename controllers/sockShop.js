const express = require('express');
const sock = express.Router();
const Socks = require('../models/sockSchema.js');
const sockSeed = require('../models/socks.js');

// routes!
// index / sock store!
sock.get('/', (req, res) => {
  // if the current user is a wizard, show wand shop
  // if (req.session.currentUser.isWizard = true) {
  //   Wands.find({}, (error, allWands) => {
  //     res.render('wandShop/index.ejs', {
  //       currentUser: req.sessions.currentUser
  //     })
  //   })
  // } else {
  // else, show the sock shop
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
sock.get('/create', (req, res) => {
  res.render('socks/create.ejs')
})

sock.post('/', (req, res) => {
  Socks.create(req.body, (error, createdItem) => {
    res.redirect('/')
  })
})

// show!
sock.get('/:id', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render('socks/show.ejs', {
      sock: foundSock
    })
  })
})

// edit!
sock.put('/:id', (req, res) => {
  Socks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
    res.redirect('/')
  })
})

sock.get('/:id/edit', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render(
      'socks/update.ejs',
      {
        sock: foundSock
      }
    )
  })
})

// delete!
sock.delete('/:id', (req, res) => {
  Socks.findByIdAndRemove(req.params.id, (error, data)=> {
    res.redirect('/')
  })
})

module.exports = sock
