require('../config')

const { State } = require('../models')
const { mongoose } = require('../db/mongoose')

const states = [
  { shortName: 'AL', longName: 'Alabama', salesTax: { average: .091, base: .04 } },
  { shortName: 'AK', longName: 'Alaska', salesTax: { average: .0176, base: 0 } },
  { shortName: 'AZ', longName: 'Arizona', salesTax: { average: .0833, base: .056 } },
  { shortName: 'AR', longName: 'Arkansas', salesTax: { average: .0941, base: .065 } },
  { shortName: 'CA', longName: 'California', salesTax: { average: .0854, base: .0725 } },
  { shortName: 'CO', longName: 'Colorado', salesTax: { average: .0752, base: .029 } },
  { shortName: 'CT', longName: 'Connecticut', salesTax: { average: .0635, base: .0635 } },
  { shortName: 'DE', longName: 'Delaware', salesTax: { average: 0, base: 0 } },
  { shortName: 'DC', longName: 'District of Columbia', salesTax: { average: .0575, base: .0575 } },
  { shortName: 'FL', longName: 'Florida', salesTax: { average: .068, base: .06 } },
  { shortName: 'GA', longName: 'Georgia', salesTax: { average: .0715, base: .04 } },
  { shortName: 'HI', longName: 'Hawaii', salesTax: { average: .0435, base: .04166 } },
  { shortName: 'ID', longName: 'Idaho', salesTax: { average: .0603, base: .06 } },
  { shortName: 'IL', longName: 'Illinois', salesTax: { average: .087, base: .0625 } },
  { shortName: 'IN', longName: 'Indiana', salesTax: { average: .07, base: .07 } },
  { shortName: 'IA', longName: 'Iowa', salesTax: { average: .068, base: .06 } },
  { shortName: 'KS', longName: 'Kansas', salesTax: { average: .0868, base: .065 } },
  { shortName: 'KY', longName: 'Kentucky', salesTax: { average: .06, base: .06 } },
  { shortName: 'LA', longName: 'Louisiana', salesTax: { average: .1002, base: .05 } },
  { shortName: 'ME', longName: 'Maine', salesTax: { average: .055, base: .055 } },
  { shortName: 'MD', longName: 'Maryland', salesTax: { average: .06, base: .06 } },
  { shortName: 'MA', longName: 'Massachusetts', salesTax: { average: .0625, base: .0625 } },
  { shortName: 'MI', longName: 'Michigan', salesTax: { average: .06, base: .06 } },
  { shortName: 'MN', longName: 'Minnesota', salesTax: { average: .0742, base: .06875 } },
  { shortName: 'MS', longName: 'Mississippi', salesTax: { average: .0707, base: .07 } },
  { shortName: 'MO', longName: 'Missouri', salesTax: { average: .0803, base: .04225 } },
  { shortName: 'MT', longName: 'Montana', salesTax: { average: 0, base: 0 } },
  { shortName: 'NE', longName: 'Nebraska', salesTax: { average: .0689, base: .055 } },
  { shortName: 'NV', longName: 'Nevada', salesTax: { average: .0814, base: .0685 } },
  { shortName: 'NH', longName: 'New Hampshire', salesTax: { average: 0, base: 0 } },
  { shortName: 'NJ', longName: 'New Jersey', salesTax: { average: .066, base: .06625 } },
  { shortName: 'NM', longName: 'New Mexico', salesTax: { average: .0766, base: .05125 } },
  { shortName: 'NY', longName: 'New York', salesTax: { average: .0849, base: .04 } },
  { shortName: 'NC', longName: 'North Carolina', salesTax: { average: .0695, base: .0475 } },
  { shortName: 'ND', longName: 'North Dakota', salesTax: { average: .068, base: .05 } },
  { shortName: 'OH', longName: 'Ohio', salesTax: { average: .0715, base: .0575 } },
  { shortName: 'OK', longName: 'Oklahoma', salesTax: { average: .0891, base: .045 } },
  { shortName: 'OR', longName: 'Oregon', salesTax: { average: 0, base: 0 } },
  { shortName: 'PA', longName: 'Pennsylvania', salesTax: { average: .0634, base: .06 } },
  { shortName: 'RI', longName: 'Rhode Island', salesTax: { average: .07, base: .07 } },
  { shortName: 'SC', longName: 'South Carolina', salesTax: { average: .0737, base: .06 } },
  { shortName: 'SD', longName: 'South Dakota', salesTax: { average: .064, base: .04 } },
  { shortName: 'TN', longName: 'Tennessee', salesTax: { average: .0946, base: .07 } },
  { shortName: 'TX', longName: 'Texas', salesTax: { average: .0817, base: .0625 } },
  { shortName: 'UT', longName: 'Utah', salesTax: { average: .0677, base: .0595 } },
  { shortName: 'Vermont', longName: 'Vermont', salesTax: { average: .0618, base: .06 } },
  { shortName: 'VA', longName: 'Virginia', salesTax: { average: .0563, base: .053 } },
  { shortName: 'WA', longName: 'Washington', salesTax: { average: .0918, base: .065 } },
  { shortName: 'WV', longName: 'West Virginia', salesTax: { average: .0637, base: .06 } },
  { shortName: 'WI', longName: 'Wisconsin', salesTax: { average: .0542, base: .05 } },
  { shortName: 'WY', longName: 'Wyoming', salesTax: { average: .0546, base: .04 } },
]

states.forEach(state => {
  const dbstate = new State(state)

  dbstate.save().then(state => {
    console.log('State added to db', state)
  }).catch(err => {
    console.log('State was not added', err)
  })
})

setTimeout(() => {
  mongoose.connection.close()
}, 50000)
