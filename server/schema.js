const { 
  GraphQLList,
  GraphQLObjectType, 
  GraphQLSchema,
  GraphQLString,
} = require('graphql')

const { Currency, State } = require('./models')
const { geocode, reverseGeocode } = require('./utils')

const { AddressType, CurrencyType, StateType } = require('./types')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    currency: {
      description: 'Find a currency by source attribute. There are two supported currencies;\n\nUS Dollars (source: "USD")\n\nEuro (source: "EUR")',
      type: CurrencyType,
      args: {
        source: { type: GraphQLString, defaultValue: "USD" }
      },
      resolve: async (parentValue, args) => {
        const source = args.source.toUpperCase()
        return await Currency.findOne({ source })
      }
    },
    currencies: {
      description: 'Find all currencies available',
      type: new GraphQLList(CurrencyType),
      resolve: async (parentValue, args) => {
        return await Currency.find()
      }
    },
    address: {
      description: 'Find an address by latitude and longitude or address as string. If coordinates are input the string address will be ignored',
      type: AddressType,
      args: {
        lat: { type: GraphQLString },
        lng: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve: async (parentValue, args) => {
        const { lat, lng, address } = args
        
        if(lat && lng && lat !== undefined && lng !== undefined) {
          return await reverseGeocode(lat,lng)
        } if(address) {
          return await geocode(address)
        } else {
          throw new Error('Unable to find location')
        }

      }
    },
    state: {
      description: 'Find a US state by state code or full name',
      type: StateType,
      args: {
        code: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve: async (parentValue, args) => {
        if(args.code) {
          return await State.findOne({ shortName: args.code })
        }
        return await State.findOne({ longName: args.name })
      }
    },
    states: {
      description: 'Get list of all states',
      type: new GraphQLList(StateType),
      resolve: async (parentValue, args) => {
        return await State.find()
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
