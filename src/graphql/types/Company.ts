import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'

export default new GraphQLObjectType({
  name: 'Company',
  description: 'Datos de las empresas aperturadas por cada usuario',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    businessName: { type: GraphQLString },
    ruc: { type: GraphQLString },
    squareIcon: { type: GraphQLString },
    rectangleIcon: { type: GraphQLString },
    isDefault: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
    updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
  }),
})
