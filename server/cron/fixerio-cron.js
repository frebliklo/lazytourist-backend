const { Currency } = require('../models/currency')
const { fetchFixer } = require('../utils/fetchFixer')

const fixerIoCron = () => {
  fetchFixer((err, res) => {
    if(err) {
      return console.log('Something went wrong with fetching currency from fixer.io', err)
    } else {
      Currency.findOneAndUpdate({ source: 'EUR' }, res, (err, update) => {
        if(err) {
          return console.log('Could not update EUR currency document', err)
        }
        console.log('Updated EUR currency document', update)
      })
    }
  })
}

module.exports = { fixerIoCron }
