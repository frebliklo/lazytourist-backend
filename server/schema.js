const { 
  GraphQLList,
  GraphQLObjectType, 
  GraphQLSchema,
  GraphQLString,
} = require('graphql')

const { Currency } = require('./models/currency')

const { CurrencyType } = require('./types')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    currency: {
      description: 'Find a currency by source attribute. There are two supported currencies;\n\nUS Dollars (source: "USD")\n\nEuro (source: "EUR")',
      type: CurrencyType,
      args: {
        source: { type: GraphQLString, defaultValue: "USD" }
      },
      resolve: (parentValue, args) => {
        const source = args.source.toUpperCase()
        return Currency.findOne({ source })
          .then(currency => currency)
      }
    },
    currencies: {
      description: 'Find all currencies available',
      type: new GraphQLList(CurrencyType),
      resolve: (parentValue, args) => {
        return Currency.find().then(currencies => currencies)
      }
    }
  })
})

const schema = new GraphQLSchema({
  query
})

module.exports = {
  schema
}
