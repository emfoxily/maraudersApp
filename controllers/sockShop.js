const express = require('express');
const router = express.Router();
const Socks = require('../models/sockSchema.js');
const sockSeed = require('../models/socks.js');

// routes!
// index / sock store!
router.get('/', (req, res) => {
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

// create!
router.get('/create', (req, res) => {
  res.render('socks/create.ejs')
})

router.post('/', (req, res) => {
  Socks.create(req.body, (error, createdItem) => {
    res.redirect('/')
  })
})

// show!
router.get('/:id', (req, res) => {
  Socks.findById(req.params.id, (error, foundSock) => {
    res.render('socks/show.ejs', {
      sock: foundSock
    })
  })
})

// edit!
router.put('/:id', (req, res) => {
  Socks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updated) => {
    res.redirect('/')
  })
})

router.get('/:id/edit', (req, res) => {
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
router.delete('/:id', (req, res) => {
  Socks.findByIdAndRemove(req.params.id, (error, data)=> {
    res.redirect('/')
  })
})

module.exports = router
