// mongoose!
const mongoose = require('mongoose')
// schema!
const Schema = mongoose.Schema

const userSchema = Schema({
  username: String,
  password: String,
  isWizard: Boolean
})

// model!
const User = mongoose.model('User', userSchema)

// export!
module.exports = User
