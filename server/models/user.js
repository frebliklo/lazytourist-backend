const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, required: true, trim: true, minlength: 5 }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
