import { GraphQLObjectType, GraphQLInt } from 'graphql'

export default new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Información de la paginación',
  fields: () => ({
    lastPage: { type: GraphQLInt },
    totalCount: { type: GraphQLInt }
  }),
})
