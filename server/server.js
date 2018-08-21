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


nodeCron.schedule('0,30,39 */1 * * *', () => {
  console.log('Job running every minute 0, 30, 39 of every hour', new Date())
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
  fetchFixer((err, res) => {
    if(err) {
      return console.log('Something went wrong with fetching currency from Fixer', err)
    }
    const currency = new Currency(res)

    currency.save().then(console.log(currency))
  })
})

// Consider removing this at some point soon... Should only be for initializing the db (which have already been done)
app.post('/currencies', (req, res) => {
  const currency = new Currency(req.body.currency)

  currency.save().then(doc => {
    res.send(doc)
  }, e => {
    res.status(400).send(e)
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
