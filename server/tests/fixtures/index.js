const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { JWT_SALT } = require('../../../keys')

const { Currency } = require('../../models/currency')
const { User } = require('../../models/user')

const currencyOneId = new ObjectID()
const currencyTwoId = new ObjectID()

const rateOneId = new ObjectID()
const rateTwoId = new ObjectID()
const rateThreeId = new ObjectID()
const rateFourId = new ObjectID()
const rateFiveId = new ObjectID()
const rateSixId = new ObjectID()

const currencyOneUpdatedAt = '2018-08-21T18:30:20.093Z'
const currencyTwoUpdatedAt = '2018-08-21T18:30:20.093Z'

const currencies = [{
  __v: 0,
  _id: currencyOneId,
  source: 'USD',
  name: 'US Dollars',
  rates: [{
    _id: rateOneId,
    currency: 'DKK',
    name: 'Danske Kroner',
    rate: 6.5
  }, {
    _id: rateTwoId,
    currency: 'EUR',
    name: 'Euro',
    rate: 0.8
  }, {
    _id: rateThreeId,
    currency: 'GBP',
    name: 'Pound Sterling',
    rate: 0.75
  }],
  updatedAt: currencyOneUpdatedAt
}, {
  __v: 0,
  _id: currencyTwoId,
  source: 'EUR',
  name: 'Euro',
  rates: [{
    _id: rateFourId,
    currency: 'DKK',
    name: 'Danske Kroner',
    rate: 6.8
  }, {
    _id: rateFiveId,
    currency: 'USD',
    name: 'US Dollars',
    rate: 0.9
  }, {
    _id: rateSixId,
    currency: 'GBP',
    name: 'Pound Sterling',
    rate: 0.35
  }],
  updatedAt: currencyTwoUpdatedAt
}]

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [{
  _id: userOneId,
  email: 'tester@ester.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, JWT_SALT).toString()
  }]
}, {
  _id: userTwoId,
  email: 'esther@tester.xyz',
  password: 'userTwoPass'
}]

const populateCurrencies = done => {
  Currency.remove({}).then(() => {
    return Currency.insertMany(currencies)
  }).then(() => done())
}

const populateUsers = done => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save()
    const userTwo = new User(users[1]).save()
    
    return Promise.all([userOne,userTwo])
  }).then(() => done())
}

module.exports = { currencies, users, populateCurrencies, populateUsers }
