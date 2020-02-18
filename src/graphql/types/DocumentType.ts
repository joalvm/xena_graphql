import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'

export default new GraphQLObjectType({
  name: 'DocumentType',
  description: 'Tipos de documentos de identidad de cada persona',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    abbr: { type: GraphQLString },
    length: { type: GraphQLInt },
    exactLength: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
    updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
  }),
})
