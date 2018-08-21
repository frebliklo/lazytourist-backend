const expect = require('expect')

const { fetchCurrencyLayer } = require('../../utils/fetchCurrencyLayer')

describe('Fetch exchange rates for USD from CurrencyLayer', () => {
  it('should return expected data', done => {
    fetchCurrencyLayer((err, res) => {
      if(err) {
        return done(err)
      }
      expect(res.source).toBe('USD')
      expect(res.rates.length).toBe(3)
      expect(res.rates[0]).toHaveProperty('currency')
      expect(res.rates[0]).toHaveProperty('name')
      expect(res.rates[0]).toHaveProperty('rate')
      done()
    })
  })
})
