import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'
import GenderEnum from '../enums/Genders'

export default new GraphQLObjectType({
  name: 'User',
  description: '',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    gender: {type: GenderEnum },
    email: { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    salt: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    enabled: { type: GraphQLBoolean },
    recoveryPassword: { type: GraphQLString },
    createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
    updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
  }),
})
