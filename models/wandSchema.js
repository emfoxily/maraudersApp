// mongoose!
const mongoose = require('mongoose')
// schema!
const Schema = mongoose.Schema

// wand schema!
const wandSchema = Schema({
  name: {
    type: String,
    required: true
  },
  img: String,
  core: String,
  length: String,
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
const Wand = mongoose.model('Wand', wandSchema)

// export!
module.exports = Wand
