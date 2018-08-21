const expect = require('expect')

const { fetchFixer } = require('../../utils/fetchFixer')

describe('Fetch exchange rates for Euro from Fixer.io', () => {
  it('should return expected data', done => {
    fetchFixer((err, res) => {
      if(err) {
        return done(err)
      }
      expect(res.source).toBe('EUR')
      expect(res.rates.length).toBe(3)
      expect(res.rates[0]).toHaveProperty('currency')
      expect(res.rates[0]).toHaveProperty('name')
      expect(res.rates[0]).toHaveProperty('rate')
      done()
    })
  })
})
