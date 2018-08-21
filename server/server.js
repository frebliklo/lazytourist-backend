require('./config')

const express = require('express')
const bodyParser = require('body-parser')
const nodeCron = require('node-cron')

const { mongoose } = require('./db/mongoose')
const { Currency } = require('./models/currency')

const { fetchCurrencyLayer } = require('./utils/fetchCurrencyLayer')
const { fetchFixer } = require('./utils/fetchFixer') 

const app = express()

app.use(bodyParser.json())

nodeCron.schedule('0 */12 * * *', () => {
  // Log to monitor job
  console.log('Job running every minute 0 of 12th hour', new Date())
  
  // Fetch latest USD exchange rates from CurrencyLayer
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

  // Fetch latest Euro exchange rates from Fixer.io
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
})

app.get('/currencies', (req, res) => {
  Currency.find().then(currencies => {
    res.send({currencies})
  }, e => {
    res.status(400).send(`Couldn't retrieve currencies\n\n${e}`)
  })
})

app.get('/currencies/:source', (req, res) => {
  const source = req.params.source.toUpperCase()

  if(source !== 'USD' && source !== 'EUR') {
    return res.status(404).send('Unknown currency. Only USD or EUR are supported.')
  }

  Currency.findOne({ source }).then(currency => {
    res.send({ currency })
  }).catch(e => {
    res.status(400).send('Unable to get currency')
  })
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})

module.exports = { app }
