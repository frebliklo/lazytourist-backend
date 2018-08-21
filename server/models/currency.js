const mongoose = require('mongoose')
const { Schema } = mongoose

const ExchangeSchema = new Schema({
  currency: { type: String, required: true },
  name: { type: String },
  rate: { type: Number, requires: true }
})

const CurrencySchema = new Schema({
  source: { type: String, required: true },
  name: { type: String, required: true },
  rates: [ExchangeSchema],
  updatedAt: { type: Date, default: Date.now }
})

const Currency = mongoose.model('Currency', CurrencySchema)

module.exports = { Currency }
