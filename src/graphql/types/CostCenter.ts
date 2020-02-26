import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { resolveMeta } from '../../helpers';
import User from './User';

export default new GraphQLObjectType({
    name: 'CostCenter',
    description: 'Centros de Costos',
    fields: () => ({
        id: { type: GraphQLInt },
        code: { type: GraphQLString },
        name: { type: GraphQLString },
        user: { type: User },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    })
})
