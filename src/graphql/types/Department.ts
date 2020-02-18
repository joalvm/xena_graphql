import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Department',
    description: 'Departamentos del Perú',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        Provinces: { type: GraphQLString },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})

export default type