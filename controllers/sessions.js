const express = require('express')
const sessions = express.Router()
const Wizard = require('../models/wizards.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
