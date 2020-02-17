import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import EmployeeType from './EmployeeType'
import { resolveMeta } from '../../helpers'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '',
  fields: () => ({
    id: { type: GraphQLInt },
    employee: { type: EmployeeType },
    username: { type: GraphQLString },
    salt: { type: GraphQLString },
    password: { type: GraphQLString },
    recovery_password: { type: GraphQLString },
    enabled: { type: GraphQLBoolean },
    created_at: { type: GraphQLString, resolve: resolveMeta('created_at') },
    updated_at: { type: GraphQLString, resolve: resolveMeta('updated_at') },
  }),
})

export default UserType
