import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'
import ProvinceType from './Province'

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'District',
    description: 'Provincias del Perú',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        province: { type: ProvinceType },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})

export default type
