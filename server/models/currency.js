const mongoose = require('mongoose')
const { Schema } = mongoose

const exchangeSchema = new Schema({
  currency: { type: String, required: true },
  name: { type: String },
  rate: { type: Number, requires: true }
})

const currencySchema = new Schema({
  source: { type: String, required: true },
  rates: [exchangeSchema],
  updatedAt: { type: Date, default: Date.now }
})

const Currency = mongoose.model('Currency', currencySchema)

module.exports = { Currency }
