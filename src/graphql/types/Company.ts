import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { resolveMeta } from '../../helpers'

export default new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    business_name: { type: GraphQLString },
    ruc: { type: GraphQLString },
    square_icon: { type: GraphQLString },
    rectangle_icon: { type: GraphQLString },
    created_at: { type: GraphQLString, resolve: resolveMeta('created_at') },
    updated_at: { type: GraphQLString, resolve: resolveMeta('updated_at') },
  }),
})
