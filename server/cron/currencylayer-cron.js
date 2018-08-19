const { Currency } = require('../models/currency')
const { fetchCurrencyLayer } = require('../utils/fetchCurrencyLayer')

const currencyLayerCron = () => {
  fetchCurrencyLayer((err, res) => {
    if(err) {
      console.log('Something went wrong with fetching currency from CurrencyLayer', err)
    } else {
      Currency.findOneAndUpdate({ source: 'USD' }, res, (err, update) => {
        if(err) {
          return console.log('Could not update USD currency document', err)
        }
        console.log('Updated USD currency document', update)
      })
    }
  })
}

module.exports = { currencyLayerCron }
