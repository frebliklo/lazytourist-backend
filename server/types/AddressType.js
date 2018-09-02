const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SalesTaxType = require('./SalexTaxType')
const { State } = require('../models')

const AddressComponentType = new GraphQLObjectType({
  name: 'AddressComponent',
  fields: () => ({
    shortName: { type: GraphQLString },
    longName: { type: GraphQLString }
  })
})

module.exports = new GraphQLObjectType({
  name: 'Address',
  description: 'An address consisting of three components; Formatted address, state and country',
  fields: () => ({
    formattedAddress: { type: GraphQLString },
    country: { type: AddressComponentType },
    state: { type: AddressComponentType },
    salesTax: {
      type: SalesTaxType,
      resolve: async (parentValue, args) => {
        const data = await State.findOne({ shortName: parentValue.state.shortName })
        const response = {
          average: data.salesTax.average,
          base: data.salesTax.base
        }
        return response
      }
    }
  })
})
