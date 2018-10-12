// mongoose!
const mongoose = require('mongoose')
// schema!
const Schema = mongoose.Schema

const userSchema = Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isWizard: Boolean
})
