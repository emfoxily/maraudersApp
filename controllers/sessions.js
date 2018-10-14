const express = require('express')
const sessions = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if ( bcrypt.compareSync(req.body.password, foundUser.password) ){
      req.session.currentUser = foundUser;
        res.redirect('/')
    } else {
      res.send('The username or password you entered was incorrect.')
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
