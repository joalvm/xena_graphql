import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList } from 'graphql'
import { resolveMeta } from '../../helpers'
import DepartmentType from './Department'
import DistrictType from './District'

export default new GraphQLObjectType({
    name: 'Province',
    description: 'Provincias del Perú',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        department: {
            type: DepartmentType,
            resolve() {

            }
        },
        districts: {
            type: new GraphQLList(DistrictType),
            resolve() {

            }
        },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})
