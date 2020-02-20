import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'
import { resolveMeta } from '../../helpers'
import { Gender, MaritalStatus } from '../enums'

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Person',
    description: 'Personas registradas',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        gender: {type: Gender },
        maritalStatus: { type: MaritalStatus },
        documentNumber: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        direction: { type: GraphQLString },
        phone: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})

export default type
