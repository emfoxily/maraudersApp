const express = require('express')
const sessions = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
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
    // console.log('it works!'); // this isn't working for some reason...
    // res.clearCookie('index.ejs');
    res.redirect('/')
  })
})

module.exports = sessions
