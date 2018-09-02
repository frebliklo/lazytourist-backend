const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const AddressComponentType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    shortName: { type: GraphQLString },
    longName: { type: GraphQLString }
  })
})

module.exports = new GraphQLObjectType({
  name: 'Address',
  description: 'An address consisting of three components; Formatted address, state and country',
  fields: () => ({
    address: { type: GraphQLString },
    country: { type: AddressComponentType },
    state: { type: AddressComponentType }
  })
})
