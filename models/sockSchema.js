// mongoose!
const mongoose = require('mongoose')
// schema!
const Schema = mongoose.Schema

// sock schema!
const sockSchema = Schema({
  name: {
    type: String,
    required: true
  },
  img: String,
  price: {
    type: Number,
    min: 0,
    required: true
  },
  description: String,
  qty: {
    type: Number,
    min: 0,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
})

// model!
const Sock = mongoose.model('Sock', sockSchema)

// export!
module.exports = Sock
