const _ = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

UserSchema.statics.findByToken = function(token) {
  let decoded

  try {
    decoded = jwt.verify(token, JWT_SALT)
  } catch(e) {
    return Promise.reject()
  }

  return this.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    bcrypt.genSalt(15, (err,salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
