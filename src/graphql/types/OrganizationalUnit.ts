import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { resolveMeta } from '../../helpers';
import UserType from './User';
import NodeInterface from '../interfaces/Node';

export default new GraphQLObjectType({
    name: 'OrganizationalUnit',
    description: 'Unidad Organizativa',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        user: { type: UserType },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
    interfaces: [NodeInterface]
})
