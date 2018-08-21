const _ = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const { JWT_SALT } = require('../../keys')

const { Schema } = mongoose

const UserSchema = new Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: { type: String, required: true, minLength: 6 },
  tokens: [{
    access: { type: String, required: true },
    token: { type: String, required: true }
  }]
})

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() { // Use standard function to have access to this
  const access = 'auth'
  const token = jwt.sign({ _id: this._id.toHexString(), access }, JWT_SALT).toString()

  this.tokens = this.tokens.concat({ access, token })

  return this.save().then(() => {
    return token
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
