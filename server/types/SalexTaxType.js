const { GraphQLFloat, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'SalesTax',
  description: 'Sales taxes for a given US state',
  fields: () => ({
    average: { type: GraphQLFloat },
    base: { type: GraphQLFloat }
  })
})
