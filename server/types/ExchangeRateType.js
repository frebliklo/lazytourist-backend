const {
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'ExchangeRate',
  description: 'Exchange rates are tied to a currency. In addition two the two suported currencies, US Dollars and Euros, the corresponding exchange rates for Danish Kroner (DKK) and Pound Sterling (GBP) are available',
  fields: () => ({
    _id: { type: GraphQLString },
    currency: { type: GraphQLString },
    name: { type: GraphQLString },
    rate: { type: GraphQLFloat }
  })
})
