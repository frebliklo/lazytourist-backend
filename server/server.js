require('./config')

const _ = require('lodash')
const express = require('express')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db/mongoose')
const { Currency, State } = require('./models')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')
const { geocode, reverseGeocode } = require('./utils')

const { schema } = require('./schema')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/login', express.static(path.join(__dirname, '..', 'login')))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.post('/location/coordinates', (req,res) => {
  const { lat, lng } = req.body
  let data = {}

  reverseGeocode(lat,lng)
    .then(location => {
      data = location

      State.findOne({ shortName: location.state.shortName })
        .then(response => {
          data.salesTax = response.salesTax.average
          
          res.send(data)
        })
        .catch(err => res.status(400).send(`Couldn't resolve the request\n${err}`))
    })
    .catch(err => {
      res.status(400).send(`Couldn't resolve the request\n${err}`)
    })
})

app.post('/location/address', (req,res) => {
  const { address } = req.body
  let data = {}

  geocode(address)
    .then(location => {
      data = location

      State.findOne({ shortName: location.state.shortName })
        .then(response => {
          data.salesTax = response.salesTax.average

          res.send(data)
        })
        .catch(err => res.status(400).send(`Couldn't resolve the request\n${err}`))
    })
    .catch(err => {
      res.status(400).send(`Couldn't resolve the request\n${err}`)
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

app.post('/users/signup', (req, res) => {
  const body = _.pick(req.body, ['firstName', 'email', 'password'])
  
  const user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then(token => {
    res.header('x-auth', token).send(user)
  }).catch(e => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  const { email, password } = body

  User.findByCredentials(email,password).then(user => {
    return user.generateAuthToken().then(token => {
      return res.header('x-auth', token).send({ message: 'You are now logged in!', token })
    })
  }).catch(e => {
    res.status(401).send('Invalid password or username')
  })
})

app.delete('/users/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }).catch(e => {
    res.status(400).send()
  })
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})

module.exports = { app }
