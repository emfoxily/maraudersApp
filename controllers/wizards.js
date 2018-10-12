const express = require('express')
const wizards = express.Router()
const Wizard = require('../models/wizards.js')
const bcrypt = require('bcrypt')

wizards.get('/register', (req, res) => {
  if (req.session.currentUser) {
    res.render('wizards/new.ejs')
  } else {
    res.redirect('/')
  }
})

wizards.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSalt(10))
  Wizard.create(req.body, (err, createdUser) => {
    res.redirect('/')
  })
})

module.exports = wizards
