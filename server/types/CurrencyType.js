const { 
  GraphQLList,
  GraphQLObjectType, 
  GraphQLString,
} = require('graphql')

const ExchangeRateType = require('./ExchangeRateType')

module.exports = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    _id: { type: GraphQLString },
    source: { type: GraphQLString },
    name: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    rates: { type: new GraphQLList(ExchangeRateType) },
    exchangeRate: {
      description: 'Find a single exchange rate for the source currency',
      type: ExchangeRateType,
      args: {
        currency: { type: GraphQLString, defaultValue: "DKK" }
      },
      resolve: (parentValue, args) => {
        const { currency } = args
        const returnRate = parentValue.rates.find(rate => rate.currency === currency.toUpperCase())
        
        return returnRate
      }
    }
  })
})
