const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')

const { mongoose } = require('./db/mongoose')
const { Currency } = require('./models/currency')
const { User } = require('./models/user')

const { currencyLayerCron } = require('./cron/currencylayer-cron')
const { fixerIoCron } = require('./cron/fixerio-cron')

const app = express()

app.use(bodyParser.json())

cron.schedule('* * */4 * * *', () => {
  currencyLayerCron()
  fixerIoCron()
})

app.post('/currencies', (req, res) => {
  const currency = new Currency(req.body.currency)
  console.log(req.body.currency)

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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})

module.exports = { app }
