const expect = require('expect')
const request = require('supertest')

const { app } = require('../server')
const { Currency } = require('../models/currency')

describe('GET /currencies', () => {
  it('should get all currencies', done => {
    request(app)
      .get('/currencies')
      .expect(200)
      .expect(res => {
        expect(res.body.currencies.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /currencies/:source', () => {
  it('should return currency doc', done => {
    request(app)
      .get('/currencies/usd')
      .expect(200)
      .expect(res => {
        expect(res.body.currency.source).toBe('USD')
      })
      .end(done)
  })

  it('should return 404 if currency not found', done => {
    request(app)
      .get('/currencies/dkk')
      .expect(404)
      .end(done)
  })
})
