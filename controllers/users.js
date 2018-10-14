const express = require('express')
const users = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

users.get('/register', (req, res) => {
    res.render('users/new.ejs', {
      currentUser: req.session.currentUser
    })
})

users.post('/', (req, res) => {
  if (req.body.isWizard === 'on') { // data correction
    req.body.isWizard = true
  } else {
    req.body.isWizard = false
  }
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    res.redirect('/')
  })
})

module.exports = users
