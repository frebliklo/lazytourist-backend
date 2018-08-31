const axios = require('axios')

const { CURRENCY_LAYER_API_KEY } = require('../config/keys')

const currencies = 'DKK,EUR,GBP'
const url = `http://www.apilayer.net/api/live?access_key=${CURRENCY_LAYER_API_KEY}&currencies=${currencies}`

const fetchCurrencyLayer = new Promise((resolve,reject) => {
  axios.get(url)
    .then(res => {
      const { source, quotes } = res.data
      
      let newRates = []

      for(let quote in quotes) {
        switch(quote) {
          case 'USDDKK':
            const dkQuote = {
              currency: 'DKK',
              name: 'Danske Kroner',
              rate: quotes['USDDKK']
            }
            newRates.push(dkQuote)
            break
          case 'USDEUR':
            const eurQuote = {
              currency: 'EUR',
              name: 'Euro',
              rate: quotes['USDEUR']
            }
            newRates.push(eurQuote)
            break
          case 'USDGBP':
            const poundQuote = {
              currency: 'GBP',
              name: 'Pound Sterling',
              rate: quotes['USDGBP']
            }
            newRates.push(poundQuote)
            break
        }
      }

      const data = {
        source,
        name: 'United States Dollar',
        rates: newRates,
        updatedAt: Date.now()
      }
      
      resolve(data)
    })
    .catch(err => reject(err))
})

module.exports = { fetchCurrencyLayer }
