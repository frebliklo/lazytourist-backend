const axios = require('axios')

const { FIXER_API_KEY } = require('../../keys/keys')

const currencies = 'GBP,USD,DKK'
const url = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&symbols=${currencies}`

const fetchFixer = callback => {
  axios.get(url)
    .then(res => {
      const { base, rates } = res.data

      let newRates = []

      for(let rate in rates) {
        switch(rate) {
          case 'DKK':
            const dkRate = {
              currency: 'DKK',
              name: 'Danske Kroner',
              rate: rates['DKK']
            }
            newRates.push(dkRate)
            break
          case 'GBP':
            const poundRate = {
              currency: 'GBP',
              name: 'Pound Sterling',
              rate: rates['GBP']
            }
            newRates.push(poundRate)
            break
          case 'USD':
            const dollarRate = {
              currency: 'USD',
              name: 'US Dollars',
              rate: rates['USD']
            }
            newRates.push(dollarRate)
            break
        }
      }

      const data = {
        source: base,
        rates: newRates,
        updatedAt: new Date()
      }

      callback(undefined, data)
    })
    .catch(err => callback(err))
}

module.exports = { fetchFixer }
