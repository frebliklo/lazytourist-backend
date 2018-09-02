const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SalesTaxType = require('./SalexTaxType')
const { State } = require('../models')

module.exports = new GraphQLObjectType({
  name: 'State',
  description: 'A US State and it\'s salestax',
  fields: () => ({
    shortName: { type: GraphQLString },
    longName: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    salesTax: {
      type: SalesTaxType,
      resolve: async (parentValue, args) => {
        const data = await State.findOne({ shortName: parentValue.shortName })
        const response = {
          average: data.salesTax.average,
          base: data.salesTax.base
        }
        return response
      }
    }
  })
})
