require('../config')

const { Currency } = require('../models')
const { mongoose } = require('../db/mongoose')
const { fetchCurrencyLayer, fetchFixer } = require('../utils')

const currencySchedule = () => {
  console.log('Scheduled job commenced')

  const currencyLayer = fetchCurrencyLayer.then(res => new Promise((resolve,reject) => {
    Currency.findOneAndUpdate({ source: 'USD' }, res)
      .then(currency => resolve(`fetched latest USD exchange rates from CurrencyLayer\n${currency}`))
      .catch(err => reject(`Couldn't resolve fetch from CurrencyLayer\n${err}`))
  }))

  const fixer = fetchFixer.then(res => new Promise((resolve,reject) => {
    Currency.findOneAndUpdate({ source: 'EUR' }, res)
      .then(currency => resolve(`fetched latest EUR exchange rates from Fixer.io\n${currency}`))
      .catch(err => reject(`Couldn't resolve fetch from Fixer\n${err}`))
  }))

  Promise.all([currencyLayer,fixer])
    .then(values => {
      console.log(`Scheduled fetch successfull!\n${values}`)
      mongoose.connection.close()
      console.log('Scheduled job completed')
    })
    .catch(err => {
      console.log(`Scheduled fetch failes!\n${err}`)
      mongoose.connection.close()
      console.log('Scheduled job completed')
    })
}

currencySchedule()
