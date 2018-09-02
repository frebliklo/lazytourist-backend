const mongoose = require('mongoose')
const { Schema } = mongoose

const SalesTaxSchema = new Schema({
  average: { type: Number, required: true },
  base: { type: Number },
  detailed: {
    groceries: { type: Number },
    preparedFood: { type: Number },
    prescriptionDrug: { type: Number },
    nonPrescriptionDrug: { type: Number },
    clothing: { type: Number },
    intangibles: { type: Number }
  }
})

const StateSchema = new Schema({
  shortName: { type: String, required: true },
  longName: { type: String, required: true },
  countryCode: { type: String, default: 'USA' },
  salesTax: SalesTaxSchema
})

const State = mongoose.model('State', StateSchema)

module.exports = { State }
